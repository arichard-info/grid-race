import { Writable, writable } from "svelte/store"
import getRouteMatcher from "path-match"
import queryString from "query-string"

import { routes, fallback } from "./routes"

interface PageConfig {
    main: string
    layout?: string
    params?: object
}

export const components: Writable<object> = writable({})
export const loading: Writable<boolean> = writable(true)

const routeMatcher = getRouteMatcher({
    sensitive: true,
    strict: true,
    end: true,
})

export const init = async () => {
    await loadPage()
}

export const loadPage = async () => {
    loading.set(true)
    const pageComponents = await resolvePageComponents()
    components.set(pageComponents)
    loading.set(false)
}

export const importLayout = (component: string): Promise<any> => {
    return import(`./../components/Layouts/${component}`)
}

export const importMain = (component: string): Promise<any> => {
    return import(`./../components/Pages/${component}`)
}

export const getQueryParams = (search: string): object => {
    return queryString.parse(search?.substring(1) || "")
}

export const resolvePageConfig = (pathname: string): PageConfig => {
    for (const [path, config] of Object.entries(routes)) {
        const match = routeMatcher(path)
        const params = match(pathname)
        if (params) return { ...config, params }
    }
    return fallback
}

export const resolvePageComponents = async (): Promise<object> => {
    const { pathname, search } = window.location
    const query = getQueryParams(search)
    const { layout = "Default", main, params = {} } = resolvePageConfig(pathname)

    const [layoutComponent, mainComponent] = await Promise.all([
        importLayout(layout),
        importMain(main),
    ])

    return {
        main: mainComponent,
        layout: layoutComponent,
        props: {
            params,
            query,
        },
    }
}
