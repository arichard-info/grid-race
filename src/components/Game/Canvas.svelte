<script>
  import { onMount } from "svelte";

  import {
    width,
    height,
    pixelRatio,
    canvas as canvasStore,
    context as contextStore,
    renderer,
    time,
  } from "./../../state/canvas.js";

  let canvas;
  let context;
  let frame;

  export const render = (dt) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    Object.values($renderer).forEach((render) => render());
  };

  const handleResize = async () => {
    width.set(window.innerWidth * window.devicePixelRatio);
    height.set(window.innerHeight * window.devicePixelRatio);
  };

  function createLoop(fn) {
    let elapsed = 0;
    let lastTime = performance.now();
    (function loop() {
      frame = requestAnimationFrame(loop);
      const beginTime = performance.now();
      const dt = (beginTime - lastTime) / 1000;
      lastTime = beginTime;
      elapsed += dt;
      fn(elapsed, dt);
    })();
    return () => {
      cancelAnimationFrame(frame);
    };
  }

  onMount(() => {
    context = canvas.getContext("2d");
    canvasStore.set(canvas);
    contextStore.set(context);

    return createLoop((elapsed, dt) => {
      time.set(elapsed);
      render(dt);
    });
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
