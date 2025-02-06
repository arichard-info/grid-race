<script lang="ts">
	interface Props {
		onclick: () => void;
	}

	let { onclick }: Props = $props();
</script>

<button {onclick} aria-label="track">
	<div></div>
</button>

<style>
	button {
		width: 100%;
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 0;
		transition: all 0.2s ease;
	}

	button:hover,
	button:focus {
		transform: scale(1.05);
	}
	div {
		background-color: var(--color-bg-default);
		border: 1px solid var(--color-border-default);
		border-radius: 0.5rem;
		height: 0;
		width: 100%;
		padding-top: 70%;
	}
</style>
