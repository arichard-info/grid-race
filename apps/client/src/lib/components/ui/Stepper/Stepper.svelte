<script lang="ts">
    import { createEventDispatcher } from "svelte";
	import Title from "$lib/components/ui/Title/Title.svelte";

    type Step = {
        label: string;
        value: string;
    }
    export let steps: Step[] = [];
    export let currentStep: string|undefined = undefined;

    const dispatch = createEventDispatcher();

    const handleClick = (step: string) => () => {
        dispatch("click", step);
    }

    $: currentStepIndex = currentStep ? steps.findIndex(s => s.value === currentStep) : -1;
</script>

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
        text-decoration: underline;
    }

    button:disabled :global(.title) {
        color: var(--color-text-secondary);
    }

    button:not(:disabled) {
        cursor: pointer
    }
</style>


<div>
    {#each steps as step, index (step.value)}
        <button on:click={handleClick(step.value)} class:active={currentStepIndex === index} disabled={currentStepIndex < index}>
            <Title level="span" class="title">{step.label}</Title>
        </button>
    {/each}
</div>