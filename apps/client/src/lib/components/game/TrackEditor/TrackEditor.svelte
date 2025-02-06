<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import type Game from 'gameboard/src/js';
	import { Mode } from 'gameboard/src/js';
	import Button from '$lib/components/ui/Button/Button.svelte';

	interface Props {
		gameboard: Game | undefined;
		onClickCancel: () => void;
	}

	let { gameboard, onClickCancel }: Props = $props();
	let initialMode: string | undefined;

	onMount(() => {
		initialMode = gameboard?.mode;
		if (gameboard && initialMode !== Mode.Editor) {
			gameboard.changeMode(Mode.Editor);
		}
	});

	onDestroy(() => {
		if (gameboard && initialMode) gameboard.changeMode(initialMode);
	});
</script>

<div>
	<Button variant="primary-reversed" onclick={onClickCancel}>Annuler</Button>
	<Button>Valider</Button>
</div>

<style>
	div {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 1rem;
	}
</style>
