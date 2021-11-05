import { writable } from "svelte/store";
import getRouteMatcher from "path-match";
import queryString from "query-string";

export const components = writable();
export const loading = writable(true);

const routeMatcher = getRouteMatcher({
  sensitive: true,
  strict: true,
  end: true,
});

export const routes = {
  "/game/:id": {
    main: "Game",
  },
  "/about": {
    main: "About",
    layout: "Page",
  },
  "/": {
    main: "Home",
    layout: "Page",
  },
};

export const fallback = {
  main: "404",
  layout: "Page",
};

export const loadPage = async () => {
  loading.set(true);
  const pageComponents = await resolvePageComponents();
  components.set(pageComponents);
  loading.set(false);
};

export const init = async () => {
  await loadPage();
};

export default init;

export const importLayout = (component) => {
  return import(`./../components/Layouts/${component}`);
};

export const importMain = (component) => {
  return import(`./../components/Pages/${component}`);
};

export const getQueryParams = (search) => {
  return queryString.parse(search?.substring(1) || "");
};

export const resolvePageConfig = (pathname) => {
  for (const [path, config] of Object.entries(routes)) {
    const match = routeMatcher(path);
    const params = match(pathname);
    if (params) {
      config.params = params;
      return config;
    }
  }
  return fallback;
};

export const resolvePageComponents = async () => {
  const { pathname, search } = window.location;
  const query = getQueryParams(search);
  const { layout = "Default", main, params = {} } = resolvePageConfig(pathname);

  const [layoutComponent, mainComponent] = await Promise.all([
    importLayout(layout),
    importMain(main),
  ]);

  return {
    main: mainComponent,
    layout: layoutComponent,
    props: {
      params,
      query,
    },
  };
};
