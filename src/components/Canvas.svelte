<script>
  import { onMount, tick } from "svelte";

  import {
    width,
    height,
    pixelRatio,
    canvas as canvasStore,
    context as contextStore,
    renderer,
  } from "./../state/canvas.js";

  let canvas;
  let context;

  export const render = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    $renderer.forEach((render) => render());
  };

  const handleResize = async () => {
    width.set(window.innerWidth);
    height.set(window.innerHeight);
    await tick();
    render();
  };

  onMount(() => {
    context = canvas.getContext("2d");
    canvasStore.set(canvas);
    contextStore.set(context);
  });
</script>

<canvas
  on:click
  on:mousemove
  bind:this={canvas}
  width={$width * $pixelRatio}
  height={$height * $pixelRatio}
  style="width: {$width}px; height: {$height}px;"
/>
<svelte:window on:resize|passive={handleResize} />

{#if canvas && context}
  <slot />
{/if}
