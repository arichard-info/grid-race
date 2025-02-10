<script lang="ts">
	import Stepper from '$lib/components/ui/Stepper/Stepper.svelte';
	import Button from '$lib/components/ui/Button/Button.svelte';
	import Card from '$lib/components/ui/Card/Card.svelte';
	import Icon from '$lib/components/ui/Icon/Icon.svelte';

	import TrackSelection from '$lib/components/draft/TrackSelection/TrackSelection.svelte';
	import PlayerSelect from '$lib/components/draft/PlayerSelect/PlayerSelect.svelte';
	import Gameboard from '$lib/components/game/Gameboard/Gameboard.svelte';
	import TrackEditor from '$lib/components/game/TrackEditor/TrackEditor.svelte';

	import { getRandomColor } from '$lib/utils';

	import type Game from 'gameboard/src/js';
	import clsx from 'clsx';

	const MAX_PLAYERS = 6;

	const States = {
		Players: 'PLAYERS',
		Track: 'TRACK',
		Game: 'GAME'
	};

	let gameboard: Game | undefined = $state(undefined);
	let gameState = $state(States.Players);
	let trackEditor = $state(false);
	let players = $state([{ id: '1', username: 'Joueur 1', color: getRandomColor() }]);
	let track: null = null;

	const handleSubmitPlayers = () => {
		gameState = States.Track;
		if (!track) trackEditor = false;
	};

	const handleNewPlayer = () => {
		if (players.length === MAX_PLAYERS) return;
		players = [
			...players,
			{
				id: players.length + 1 + '',
				username: `Joueur ${players.length + 1}`,
				color: getRandomColor()
			}
		];
	};

	const handleDrawClick = () => {
		trackEditor = true;
	};

	const handleStepperClick = (step: string) => {
		gameState = step;
	};

	const handleTrackSubmit = () => {
		gameState = States.Game;
	};
</script>

<Gameboard bind:game={gameboard} />

<main>
	{#if gameState !== States.Game}
		<Stepper
			onclick={handleStepperClick}
			currentStep={gameState}
			steps={[
				{ label: '1. Pilotes', value: States.Players },
				{ label: '2. Circuit', value: States.Track },
				{ label: '3. Départ', value: States.Game }
			]}
		/>
	{/if}

	{#if gameState === States.Players}
		<Card title="Combien de joueurs ?" class="player-selection">
			{#each players as player, index (player.id)}
				<PlayerSelect
					username={player.username}
					color={player.color}
					class={clsx({ ['mb-2.5']: index !== MAX_PLAYERS - 1 })}
				/>
			{/each}
			{#if players.length < MAX_PLAYERS}
				<Button stretched variant="secondary" onclick={handleNewPlayer}>
					<Icon name="plus" height="100%" />
					Ajouter
				</Button>
			{/if}
			{#snippet footer()}
				<Button stretched onclick={handleSubmitPlayers} class="mt-auto">Choix du circuit</Button>
			{/snippet}
		</Card>
	{/if}

	{#if gameState === States.Track}
		{#if trackEditor}
			<TrackEditor {gameboard} onClickCancel={() => (trackEditor = false)} />
		{:else}
			<section>
				<TrackSelection
					class="tracks"
					onClickDraw={handleDrawClick}
					onClickSubmit={handleTrackSubmit}
				/>
			</section>
		{/if}
	{/if}
</main>

<style>
	main {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		pointer-events: none;
	}

	main :global(*) {
		pointer-events: auto;
	}

	main :global(.player-selection) {
		margin: auto;
		min-height: 451px;
	}

	section {
		flex-grow: 1;
		padding-left: var(--spacing-5);
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	section :global(.tracks) {
		width: 100%;
		margin: auto;
	}
</style>
