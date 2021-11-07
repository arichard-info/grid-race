<script lang="ts">
    import Canvas from "./Canvas.svelte"
    import Background from "./Background.svelte"
    import DotGrid from "./Grid/Dot.svelte"
    import Track from "./Track.svelte"
    import Car from "./Car.svelte"
    import FPS from "./FPS.svelte"

    import {
        positionDifference,
        pixelToPosition,
        vectorsToPosition,
        isAccelerationValid,
    } from "./../../utils/game"
    import { caseSize, trackOffset } from "../../state/canvas"
    import track from "./../../tracks/track-1.json"

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
    ]

    const handleClick = async (e) => {
        const destination = pixelToPosition([e.offsetX, e.offsetY], $caseSize)
        const trackDestionation = positionDifference(destination, $trackOffset)
        const carPosition = vectorsToPosition(cars[0].vectors, cars[0].start)
        const newVector = positionDifference(trackDestionation, carPosition)
        const lastVector = cars[0].vectors[cars[0].vectors.length - 1]
        const acceleration = positionDifference(newVector, lastVector)

        if (isAccelerationValid(acceleration)) {
            cars[0].vectors = [...cars[0].vectors, newVector]
        }
    }

    const handleMouseMove = () => {}
</script>

<Canvas on:click={handleClick} on:mousemove={handleMouseMove}>
    <Background color="#E5E5E5">
        <Track {track}>
            <DotGrid />
            {#each cars as car, index (car)}
                <Car id={car.id} vectors={car.vectors} start={car.start} />
            {/each}
        </Track>
        <FPS />
    </Background>
</Canvas>
