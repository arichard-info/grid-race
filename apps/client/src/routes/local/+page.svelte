<script lang="ts">
	import classNames from "classnames";

	import Stepper from "$lib/components/ui/Stepper/Stepper.svelte";
    import Button from "$lib/components/ui/Button/Button.svelte";
    import Card from "$lib/components/ui/Card/Card.svelte";
	import Icon from "$lib/components/ui/Icon/Icon.svelte";

	import TrackSelection from "$lib/components/draft/TrackSelection/TrackSelection.svelte";
	import PlayerSelect from "$lib/components/draft/PlayerSelect/PlayerSelect.svelte";
    import Gameboard from "$lib/components/game/Gameboard/Gameboard.svelte";

	import { getRandomColor } from "$lib/utils";

    enum States {
        Players = "PLAYERS",
        Selection = "SELECTION",
        Draw = "DRAW",
        Game = "GAME",
    }

    let state = States.Players;

    const handleSubmitPlayers = () => {
        state = States.Selection;
    }

    const handleNewPlayer = () => {
        // TODO : Gérer la création de joueurs direct sur le canvas
        if(players.length === MAX_PLAYERS) return;
        players = [...players, { id: players.length + 1 + "", username: `Joueur ${players.length + 1}`, color: getRandomColor()}]
    }

    const handleDrawClick = () => {
        state = States.Draw;
    }

    const handleStepperClick = (event: CustomEvent) => {
        state = event.detail;
    }

    const MAX_PLAYERS = 6;
    let players = [{ id: "1", username: "Joueur 1", color: getRandomColor() }];
</script>

<style>
    main {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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

<Gameboard />

<main>
    <Stepper on:click={handleStepperClick} currentStep={state} steps={[
        { label: "1. Grille de départ", value: States.Players}, 
        { label: "2. Choix du circuit", value: States.Selection },
        { label: "3. Départ !", value: States.Game}
    ]} />

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
    
    {#if state === States.Selection}
        <section>
            <TrackSelection class="tracks" on:draw={handleDrawClick}/>
        </section>
    {/if}

    {#if state === States.Draw}
    {/if}
</main>

