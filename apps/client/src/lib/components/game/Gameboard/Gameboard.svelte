<script lang="ts">
    import { onMount } from "svelte";

    let rootElement: HTMLDivElement | null = null;

    onMount(async () => {
        const canvasModule = await import("gameboard/src/js");
        canvasModule.init(rootElement as HTMLDivElement)
    })
</script>

<style>
    div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 0;
    }
</style>

<div bind:this={rootElement} />