<script>
  import {
    registerRender,
    context,
    caseSize,
    trackOffset,
  } from "./../state/canvas";

  export let vectors = [];
  export let start = [0, 0];

  let position = [start[0] + $trackOffset[0], start[1] + $trackOffset[1]];

  const render = () => {
    position = [start[0] + $trackOffset[0], start[1] + $trackOffset[1]];
    drawLines(vectors);
  };

  const drawLines = (newVectors) => {
    $context.beginPath();
    $context.moveTo(position[0] * $caseSize, position[1] * $caseSize);
    newVectors.forEach(([x, y]) => {
      const newPos = [position[0] + x, position[1] + y];
      $context.lineTo(newPos[0] * $caseSize, newPos[1] * $caseSize);
      position = newPos;
    });

    $context.strokeStyle = "#FF0000";
    $context.lineWidth = 2;
    $context.stroke();
  };

  registerRender(render);
</script>
