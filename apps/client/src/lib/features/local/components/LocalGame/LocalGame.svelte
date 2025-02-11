<script lang="ts">
	import clsx from 'clsx';

	import Stepper from '$lib/features/shared/components/Stepper/Stepper.svelte';
	import Button from '$lib/features/shared/components/Button/Button.svelte';
	import Card from '$lib/features/shared/components/Card/Card.svelte';
	import Icon from '$lib/features/shared/components/Icon/Icon.svelte';

	import TrackSelection from '$lib/features/game/components/TrackSelection/TrackSelection.svelte';
	import PlayerSelect from '$lib/features/game/components/PlayerSelect/PlayerSelect.svelte';
	import Gameboard from '$lib/features/game/components/Gameboard/Gameboard.svelte';
	import TrackEditor from '$lib/features/game/components/TrackEditor/TrackEditor.svelte';

	import LocalGame, { State } from '$lib/features/local/stores/localGame.svelte';

	const localGame = new LocalGame();
</script>

<Gameboard bind:game={localGame.gameboard} />

<main>
	{#if localGame.gameState !== State.GAME}
		<Stepper
			onclick={(st) => localGame.changeState(st as State)}
			currentStep={localGame.gameState}
			steps={[
				{ label: '1. Pilotes', value: State.PLAYER_SELECTION },
				{ label: '2. Circuit', value: State.TRACK_SELECTION },
				{ label: '3. Départ', value: State.GAME }
			]}
		/>
	{/if}

	{#if localGame.gameState === State.PLAYER_SELECTION}
		<Card title="Combien de joueurs ?" class="player-selection">
			{#each localGame.players as player, index (player.id)}
				<PlayerSelect
					username={player.username}
					color={player.color}
					class={clsx({ ['mb-2.5']: index !== LocalGame.MAX_PLAYERS - 1 })}
				/>
			{/each}

			{#if localGame.players.length < LocalGame.MAX_PLAYERS}
				<Button stretched variant="secondary" onclick={() => localGame.addNewPlayer()}>
					<Icon name="plus" height="100%" />
					Ajouter
				</Button>
			{/if}

			{#snippet footer()}
				<Button stretched onclick={() => localGame.submitPlayerSelection()} class="mt-auto">
					Choix du circuit
				</Button>
			{/snippet}
		</Card>
	{/if}

	{#if localGame.gameState === State.TRACK_EDITION}
		<TrackEditor
			gameboard={localGame.gameboard}
			onClickCancel={() => localGame.closeTrackEditor()}
			onClickSubmit={() => localGame.submitTrackEditor()}
		/>
	{/if}

	{#if localGame.gameState === State.TRACK_SELECTION}
		<section>
			<TrackSelection
				class="tracks"
				onClickDraw={() => localGame.showTrackEditor()}
				onClickSubmit={() => localGame.submitTrackSelection()}
			/>
		</section>
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
