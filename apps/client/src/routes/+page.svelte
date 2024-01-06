<script>
    import Button from "$lib/components/global/Button/Button.svelte";
import Canvas from "$lib/components/global/Canvas/Canvas.svelte";
    import Card from "$lib/components/global/Card/Card.svelte";
	import InputText from "$lib/components/global/InputText/InputText.svelte";
</script>

<style>
    main {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>

<Canvas />

<main>
    <Card title="Nouvelle partie">
        <InputText placeholder="Saisis ton pseudo" size="stretched" />
        <Button size="stretched">Rejoindre une partie</Button>
        <Button size="stretched">Créer une partie</Button>
    </Card>
</main>
