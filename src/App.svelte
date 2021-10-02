<script>
  import Canvas from "./components/Canvas";
  import Background from "./components/Background";
  import LineGrid from "./components/LineGrid";
  import DotGrid from "./components/DotGrid";
  import Track from "./components/NewTrack";
  import Car from "./components/Car";
  import FPS from "./components/FPS";

  import {
    positionDifference,
    pixelToPosition,
    vectorsToPosition,
    isAccelerationValid,
  } from "./utils";
  import { caseSize, trackOffset } from "./state/canvas";
  import track from "./tracks/track-1.json";

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

  const handleClick = async (e) => {
    const destination = pixelToPosition([e.offsetX, e.offsetY], $caseSize);
    const trackDestionation = positionDifference(destination, $trackOffset);
    const carPosition = vectorsToPosition(cars[0].vectors, cars[0].start);
    const newVector = positionDifference(trackDestionation, carPosition);
    const lastVector = cars[0].vectors[cars[0].vectors.length - 1];
    const acceleration = positionDifference(newVector, lastVector);

    if (isAccelerationValid(acceleration)) {
      cars[0].vectors = [...cars[0].vectors, newVector];
    }
  };

  const handleMouseMove = () => {
    // console.log("coucou");
  };
</script>

<Canvas on:click={handleClick} on:mousemove={handleMouseMove}>
  <Background color="hsl(0, 0%, 10%)">
    <Track {track}>
      <DotGrid />
      {#each cars as car, index (car)}
        <Car id={car.id} vectors={car.vectors} start={car.start} />
      {/each}
    </Track>
    <FPS />
  </Background>
</Canvas>
