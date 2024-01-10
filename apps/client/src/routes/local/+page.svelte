<script lang="ts">
	import classNames from "classnames";

	import Stepper from "$lib/components/ui/Stepper/Stepper.svelte";
    import Button from "$lib/components/ui/Button/Button.svelte";
    import Card from "$lib/components/ui/Card/Card.svelte";
	import Icon from "$lib/components/ui/Icon/Icon.svelte";

	import TrackSelection from "$lib/components/draft/TrackSelection/TrackSelection.svelte";
	import PlayerSelect from "$lib/components/draft/PlayerSelect/PlayerSelect.svelte";
    import Gameboard from "$lib/components/game/Gameboard/Gameboard.svelte";
	import TrackEditor from "$lib/components/game/TrackEditor/TrackEditor.svelte";

	import { getRandomColor } from "$lib/utils";

	import type Game from "gameboard/src/js";

    const MAX_PLAYERS = 6;

    enum States {
        Players = "PLAYERS",
        Track = "TRACK",
        Game = "GAME",
    }

    let gameboard: Game | undefined = undefined;
    let state = States.Players;
    let trackEditor = false;
    let players = [{ id: "1", username: "Joueur 1", color: getRandomColor() }];
    let track: null = null;

    const handleSubmitPlayers = () => {
        state = States.Track;
        if(!track) trackEditor = false; 
    }

    const handleNewPlayer = () => {
        if(players.length === MAX_PLAYERS) return;
        players = [...players, { id: players.length + 1 + "", username: `Joueur ${players.length + 1}`, color: getRandomColor()}]
    }

    const handleDrawClick = () => {
        trackEditor = true;
    }

    const handleStepperClick = (event: CustomEvent) => {
        state = event.detail;
    }

    const handleTrackSubmit = () => {
        state = States.Game;
    }
</script>

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

<Gameboard bind:game={gameboard}/>

<main>
    {#if state !== States.Game}
        <Stepper on:click={handleStepperClick} currentStep={state} steps={[
            { label: "1. Pilotes", value: States.Players}, 
            { label: "2. Circuit", value: States.Track },
            { label: "3. Départ", value: States.Game}
        ]} />
    {/if}

    {#if state === States.Players}
        <Card title="Combien de joueurs ?" class="player-selection">
            {#each players as player, index (player.id)}
                <PlayerSelect username={player.username} color={player.color} class={classNames({ ["mb-2.5"]: index !== MAX_PLAYERS-1})}/>
            {/each}
            {#if players.length < MAX_PLAYERS}
                <Button stretched variant="secondary" on:click={handleNewPlayer} >
                    <Icon name="plus" height="100%" />
                    Ajouter
                </Button>
            {/if}
            <Button slot="footer" stretched on:click={handleSubmitPlayers} class="mt-auto">Choix du circuit</Button>
        </Card>
    {/if}
    
    {#if state === States.Track}
        {#if trackEditor}
            <TrackEditor {gameboard}/>
        {:else}
            <section>
                <TrackSelection class="tracks" on:draw={handleDrawClick} on:submit={handleTrackSubmit}/>
            </section>
        {/if}
      
    {/if}
</main>

