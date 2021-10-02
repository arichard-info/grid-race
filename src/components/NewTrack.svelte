<script context="module">
  let images = {};
</script>

<script>
  import blocks from "./../tracks/blocks";
  import {
    context,
    caseSize,
    width as canvasWidth,
    height as canvasHeight,
    registerRender,
    trackOffset,
    pixelRatio
  } from "./../state/canvas";

  export let cols = 50;
  export let track;

  let rows;
  let mounted = false;

  const render = () => {
    const DOMURL = window.URL || window.webkitURL || window;
    const size = $caseSize * track.blockSize * $pixelRatio;

    track.blocks.forEach((block, index) => {
      if (mounted) {
        $context.drawImage(
          images[block.type],
          size * block.position[0],
          size * block.position[1],
          size,
          size
        );
        return;
      }

      const image = new Image();
      const svgTemplate = blocks[block.type].getTemplate({ size });
      const svg = new Blob([svgTemplate], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = DOMURL.createObjectURL(svg);

      image.onload = function () {
        $context.drawImage(
          image,
          size * block.position[0],
          size * block.position[1],
          size,
          size
        );
        DOMURL.revokeObjectURL(url);
        if (index === track.blocks.length - 1) mounted = true;
      };

      image.src = url;
      images[block.type] = image;
    });

    trackOffset.set([0, 0]);
  };

  registerRender(render);
</script>

{#if mounted && $trackOffset}
  <slot />
{/if}
