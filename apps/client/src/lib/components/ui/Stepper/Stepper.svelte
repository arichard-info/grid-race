<script lang="ts">
	import Title from '$lib/components/ui/Title/Title.svelte';

	type Step = {
		label: string;
		value: string;
	};
	interface Props {
		steps?: Step[];
		currentStep?: string | undefined;
		onclick?: (step: string) => void;
	}

	let { onclick, steps = [], currentStep = undefined }: Props = $props();

	const handleClick = (step: string) => () => onclick?.(step);

	let currentStepIndex = $derived(
		currentStep ? steps.findIndex((s) => s.value === currentStep) : -1
	);
</script>

<div>
	{#each steps as step, index (step.value)}
		<button
			onclick={handleClick(step.value)}
			class:active={currentStepIndex === index}
			disabled={currentStepIndex < index}
		>
			<Title level="span" class="title">{step.label}</Title>
		</button>
	{/each}
</div>

<style>
	div {
		width: 100%;
		display: flex;
		justify-content: center;
		gap: var(--spacing-8);
		padding: var(--spacing-4);
	}

	button {
		border: none;
		background-color: transparent;
	}

	button.active :global(.title) {
		border-bottom: 3px solid var(--color-border-default);
	}

	button:disabled :global(.title) {
		color: var(--color-text-secondary);
	}

	button:not(:disabled) {
		cursor: pointer;
	}
</style>
