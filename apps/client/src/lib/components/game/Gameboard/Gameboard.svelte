<script lang="ts">
	import type Game from 'gameboard/src/js';
	import { onMount } from 'svelte';

	interface Props {
		game?: Game | null;
	}

	let { game = $bindable() }: Props = $props();

	let rootElement: HTMLDivElement | null = $state(null);

	onMount(async () => {
		const Game = (await import('gameboard/src/js')).default;
		game = new Game(rootElement as HTMLDivElement);
	});
</script>

<div bind:this={rootElement}></div>

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
