<script lang="ts">
	import type Game from "gameboard/src/js";
    import { onMount } from "svelte";

    export let game: Game | null = null;

    let rootElement: HTMLDivElement | null = null;

    onMount(async () => {
        const Game = (await import("gameboard/src/js")).default;
        game = new Game(rootElement as HTMLDivElement);
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