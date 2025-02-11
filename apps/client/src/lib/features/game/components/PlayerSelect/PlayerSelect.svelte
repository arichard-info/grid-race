<script lang="ts">
	import Icon from '$lib/features/shared/components/Icon/Icon.svelte';
	import InputText from '$lib/features/shared/components/InputText/InputText.svelte';

	interface Props {
		class?: string;
		username?: string;
		color?: string;
	}

	let { class: className = '', username = $bindable(''), color = '' }: Props = $props();
</script>

<div class={className} style="--svg-fill: #{color}">
	<Icon name="car" width="2rem" height="100%" />
	<InputText placeholder="Saisis ton pseudo" stretched powered bind:value={username} />
</div>

<style>
	div {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
	}
</style>
