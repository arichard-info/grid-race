<script>
    import Button from "$lib/components/ui/Button/Button.svelte";
    import Card from "$lib/components/ui/Card/Card.svelte";
	import InputText from "$lib/components/ui/InputText/InputText.svelte";

    import Gameboard from "$lib/components/game/Gameboard/Gameboard.svelte";
</script>

<style>
    main {
        position: relative;
        height: 100%;
        display: flex;
        align-items: flex-start;
        padding: var(--spacing-4);
    }

    section {
        flex-grow: 1;
    }

    h1 {
        text-align: center;
    }
</style>

<Gameboard />

<main>
    <Card title="Combien de joueurs ?">
        <InputText placeholder="Saisis ton pseudo" stretched powered class="mb-2.5"/>
        <Button stretched>C'est parti !</Button>
    </Card>
    <section>
        <h1>Choix du circuit</h1>
    </section>
</main>
