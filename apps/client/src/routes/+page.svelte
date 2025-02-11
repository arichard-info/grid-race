<script>
	import Button from '$lib/features/shared/components/Button/Button.svelte';
	import Card from '$lib/features/shared/components/Card/Card.svelte';
	import Title from '$lib/features/shared/components/Title/Title.svelte';

	import Gameboard from '$lib/features/game/components/Gameboard/Gameboard.svelte';
</script>

<Gameboard />

<main>
	<Title variant="huge" level="h1">Grid-Race</Title>
	<Card title="Nouvelle partie" class="card">
		<Button stretched variant="secondary" class="mb-2.5">Rejoindre une partie</Button>
		<Button stretched variant="secondary" class="mb-2.5">Créer une partie</Button>
		<Button stretched variant="secondary" href="/local">Jeu Local</Button>
	</Card>
</main>

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
