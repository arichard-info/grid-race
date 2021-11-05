<script>
  export let color = "grey";

  import {
    context,
    caseSize,
    pixelRatio,
    width as canvasWidth,
    height as canvasHeight,
    registerRender,
  } from "./../../../state/canvas";

  const render = () => {
    $context.save();

    let drawnWidth = $caseSize * $pixelRatio;
    while (drawnWidth < $canvasWidth) {
      $context.beginPath();
      let drawnHeight = $caseSize * $pixelRatio;
      while (drawnHeight < $canvasHeight) {
        $context.arc(
          drawnWidth,
          drawnHeight,
          $pixelRatio * 1.5,
          0,
          Math.PI * 2
        );
        drawnHeight += $caseSize * $pixelRatio;
      }
      drawnWidth += $caseSize * $pixelRatio;
      $context.fillStyle = color;
      $context.fill();
    }
    $context.restore();
  };

  registerRender(render);
</script>

<slot />
