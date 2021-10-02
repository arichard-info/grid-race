import { onDestroy, onMount } from "svelte";
import { writable } from "svelte/store";

// Some props for the app
export const caseSize = writable(20);
export const context = writable();
export const width = writable(window.innerWidth * window.devicePixelRatio);
export const height = writable(window.innerHeight * window.devicePixelRatio);
export const pixelRatio = writable(window.devicePixelRatio);
export const canvas = writable();
export const trackOffset = writable();
export const time = writable(0);

export const renderer = writable([]);

let renderCount = 1;
export const registerRender = (render) => {
  const renderId = `render-${renderCount}`;
  onMount(() => {
    renderer.update((renders) => ({
      ...renders,
      [renderId]: render,
    }));
  });
  onDestroy(() => {
    renderer.update((renders) => {
      delete renders[renderId];
      return renders;
    });
  });
  renderCount++;
};
