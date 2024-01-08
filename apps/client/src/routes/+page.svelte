<script>
    import Button from "$lib/components/ui/Button/Button.svelte";
    import Card from "$lib/components/ui/Card/Card.svelte";
	import InputText from "$lib/components/ui/InputText/InputText.svelte";

    import Gameboard from "$lib/components/game/Gameboard/Gameboard.svelte";
	import Title from "$lib/components/ui/Title/Title.svelte";
</script>

<style>
    main {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding-top: 5rem;
        padding-bottom: 5rem;
    }

    main :global(.card) {
        margin-top: var(--spacing-8);
        min-width: 300px;
    }
</style>

<Gameboard />

<main>
    <Title variant="huge" level="h1">Grid-Race</Title>
    <Card title="Nouvelle partie" class="card">
        <Button stretched variant="secondary" class="mb-2.5">Rejoindre une partie</Button>
        <Button stretched variant="secondary" class="mb-2.5">Créer une partie</Button>
        <Button stretched variant="secondary" href="/local">Jeu Local</Button>
    </Card>
</main>
