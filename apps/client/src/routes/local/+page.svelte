<script lang="ts">
    import Button from "$lib/components/ui/Button/Button.svelte";
    import Card from "$lib/components/ui/Card/Card.svelte";
	import InputText from "$lib/components/ui/InputText/InputText.svelte";

    import Gameboard from "$lib/components/game/Gameboard/Gameboard.svelte";
	import Title from "$lib/components/ui/Title/Title.svelte";
	import TrackSelection from "$lib/components/draft/TrackSelection/TrackSelection.svelte";

    enum States {
        Players = "PLAYERS",
        Selection = "SELECTION",
        Draw = "DRAW",
    }

    let state = States.Players;

    const handleSubmitPlayers = () => {
        state = States.Selection;
    }

    const handleDrawClick = () => {
        state = States.Draw;
    }
</script>

<style>
    main {
        position: relative;
        height: 100%;
        display: flex;
        align-items: flex-start;
        padding: var(--spacing-4);
    }

    main :global(.player-selection) {
        margin: auto;
    }

    section {
        flex-grow: 1;
        padding-left: var(--spacing-5);
        min-height: 100%;
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
    {#if state === States.Players}
        <Card title="Combien de joueurs ?" class="player-selection">
            <InputText placeholder="Saisis ton pseudo" stretched powered class="mb-2.5"/>
            <Button stretched on:click={handleSubmitPlayers}>C'est parti !</Button>
        </Card>
    {/if}
    
    {#if state === States.Selection}
        <section>
            <Title center>Choix du circuit</Title>
            <TrackSelection class="tracks" on:draw={handleDrawClick}/>
        </section>
    {/if}

    {#if state === States.Draw}
        <Title center stretched>Éditeur de circuit</Title>
    {/if}
</main>

