<script>
  import Canvas from "./components/Canvas";
  import Background from "./components/Background";
  import LineGrid from "./components/LineGrid";
  import Track from "./components/Track";
  import Car from "./components/Car";

  import {
    positionDifference,
    pixelToPosition,
    vectorsToPosition,
    isAccelerationValid,
  } from "./utils";
  import { caseSize, trackOffset } from "./state/canvas";
  import { tick } from "svelte";

  let canvasComponent;

  let cars = [
    {
      id: "1",
      start: [15, 1],
      vectors: [
        [1, 0],
        [2, 1],
      ],
    },
    {
      id: "2",
      start: [15, 2],
      vectors: [
        [1, 0],
        [2, 1],
      ],
    },
  ];

  const forceRender = () => {
    canvasComponent.render();
  };

  const handleClick = async (e) => {
    const destination = pixelToPosition([e.offsetX, e.offsetY], $caseSize);
    const trackDestionation = positionDifference(destination, $trackOffset);
    const carPosition = vectorsToPosition(cars[0].vectors, cars[0].start);
    const newVector = positionDifference(trackDestionation, carPosition);
    const lastVector = cars[0].vectors[cars[0].vectors.length - 1];
    const acceleration = positionDifference(newVector, lastVector);

    if (isAccelerationValid(acceleration)) {
      cars[0].vectors = [...cars[0].vectors, newVector];
      await tick();
      forceRender();
    }
  };

  const handleMouseMove = () => {
    // console.log("coucou");
  };
</script>

<Canvas
  on:click={handleClick}
  on:mousemove={handleMouseMove}
  bind:this={canvasComponent}
>
  <Background color="hsl(0, 0%, 10%)">
    <LineGrid />
  </Background>
  <Track>
    {#each cars as car, index (car)}
      <Car
        id={car.id}
        vectors={car.vectors}
        start={car.start}
        bind:this={cars[index].component}
      />
    {/each}
  </Track>
</Canvas>
