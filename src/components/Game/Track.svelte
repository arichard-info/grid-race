<script context="module" lang="ts">
    let images: object = {}
</script>

<script lang="ts">
    import blocks from "../../tracks/blocks"
    import { context, caseSize, registerRender, trackOffset, pixelRatio } from "../../state/canvas"

    export let cols: number = 50
    export let track

    let mounted: boolean = false

    const render = () => {
        const DOMURL: any = window.URL || window.webkitURL || window
        const size: number = $caseSize * track.blockSize * $pixelRatio

        track.blocks.forEach((block, index) => {
            if (mounted) {
                $context.drawImage(
                    images[block.type],
                    size * block.position[0],
                    size * block.position[1],
                    size,
                    size
                )
                return
            }

            const image: HTMLImageElement = new Image()
            const svgTemplate = blocks[block.type].getTemplate({ size })
            const svg: Blob = new Blob([svgTemplate], {
                type: "image/svg+xml;charset=utf-8",
            })
            const url: string = DOMURL.createObjectURL(svg)

            image.onload = function () {
                $context.drawImage(
                    image,
                    size * block.position[0],
                    size * block.position[1],
                    size,
                    size
                )
                DOMURL.revokeObjectURL(url)
                if (index === track.blocks.length - 1) mounted = true
            }

            image.src = url
            images[block.type] = image
        })

        trackOffset.set([0, 0])
    }

    registerRender(render)
</script>

{#if mounted && $trackOffset}
    <slot />
{/if}
