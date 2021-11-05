<script>
  import { context, width, height, registerRender } from "./../../state/canvas";

  export let color = "";
  let mounted = false;

  const render = () => {
    if (color) {
      $context.fillStyle = color;
      $context.fillRect(0, 0, $width, $height);
    }
    mounted = true;
  };

  registerRender(render);
</script>

{#if mounted}
  <slot />
{/if}
