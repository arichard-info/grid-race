<script lang="ts">
    import Text from "./Commons/Text.svelte"
    import { registerRender, width } from "../../state/canvas"

    let text = ""

    let frames = 0
    let prevTime = performance.now()

    const render = () => {
        let time = performance.now()
        frames++
        if (time >= prevTime + 1000) {
            const fps = (frames * 1000) / (time - prevTime)
            text = `${fps.toFixed(1)} FPS`
            prevTime = time
            frames = 0
        }
    }

    registerRender(render)
</script>

<Text
    {text}
    fontSize="14"
    fontFamily="Courier New"
    align="right"
    baseline="top"
    x={$width - 20}
    y={20}
/>

<slot />
