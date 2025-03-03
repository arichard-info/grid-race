<script lang="ts">
	import Card from '$lib/features/shared/components/Card/Card.svelte';
	import Icon from '$lib/features/shared/components/Icon/Icon.svelte';

	interface Props {
		players: Array<Player>;
		title: string;
		currentPlayerIndex?: number;
	}

	let { title, players, currentPlayerIndex }: Props = $props();
</script>

<div class="wrapper">
	<Card {title} noPadding>
		<ul>
			{#each players as player, index (player.id)}
				<li class:current={currentPlayerIndex === index} style="--svg-fill: #{player.color}">
					<Icon name="car" width="1.8rem" height="100%" />
					<span>{player.username}</span>
					<span class="rank">#{player.rank || '?'}</span>
				</li>
			{/each}
		</ul>
	</Card>
</div>

<style>
	.wrapper {
		margin: 1rem;
		min-width: 250px;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	li.current {
		border: 1px solid #000;
		box-shadow: -4px 4px 0px 0px rgba(0, 0, 0, 0.25);
		transform: scale(1.05);
		background-color: #fff;
	}

	.rank {
		font-weight: 900;
		font-style: italic;
		font-size: 1.25rem;
		margin-left: auto;
	}
</style>
