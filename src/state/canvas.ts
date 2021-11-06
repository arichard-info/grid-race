import { Point } from "./../types/coordinates"
import { onDestroy, onMount } from "svelte"
import { Writable, writable } from "svelte/store"

// Some props for the app
export const caseSize: Writable<number> = writable(20)
export const context: Writable<CanvasRenderingContext2D> = writable(null)
export const width: Writable<number> = writable(window.innerWidth * window.devicePixelRatio)
export const height: Writable<number> = writable(window.innerHeight * window.devicePixelRatio)
export const pixelRatio: Writable<number> = writable(window.devicePixelRatio)
export const canvas: Writable<HTMLElement> = writable(null)
export const trackOffset: Writable<Point> = writable(null)
export const time: Writable<number> = writable(0)

export const renderer: Writable<Array<() => void>> = writable([])

let renderCount: number = 1
export const registerRender = (render: () => void) => {
    const renderId = `render-${renderCount}`
    onMount(() => {
        renderer.update((renders) => ({
            ...renders,
            [renderId]: render,
        }))
    })
    onDestroy(() => {
        renderer.update((renders) => {
            delete renders[renderId]
            return renders
        })
    })
    renderCount++
}
