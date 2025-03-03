<script lang="ts">
	import clsx from 'clsx';

	import TrackPreviewCard from '$lib/features/shared/components/TrackPreviewCard/TrackPreviewCard.svelte';
	import Button from '$lib/features/shared/components/Button/Button.svelte';
	import Icon from '$lib/features/shared/components/Icon/Icon.svelte';

	interface Props {
		class?: string | undefined;
		onClickDraw: () => void;
		onClickSubmit: () => void;
	}

	let { class: className = undefined, onClickDraw, onClickSubmit }: Props = $props();
</script>

<div class={clsx('wrapper', className)}>
	<div class="inner">
		<TrackPreviewCard onclick={() => {}} />
		<TrackPreviewCard onclick={() => {}} />
		<TrackPreviewCard onclick={() => {}} />
		<TrackPreviewCard onclick={() => {}} />
		<TrackPreviewCard onclick={() => {}} />
		<TrackPreviewCard onclick={() => {}} />
	</div>
	<div class="buttons">
		<Button variant="primary-reversed" onclick={onClickDraw}>
			<Icon name="pen" />Editeur de circuit
		</Button>
		<Button onclick={() => onClickSubmit()}>C'est parti !</Button>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
	}
	.inner {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: var(--spacing-5);
		width: 100%;
		max-width: 800px;
		margin: auto;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		gap: var(--spacing-4);
		width: 100%;
		max-width: 800px;
		margin: auto;
		margin-top: 2rem;
	}
</style>
