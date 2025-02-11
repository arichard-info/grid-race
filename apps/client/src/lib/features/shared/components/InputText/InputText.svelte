<script lang="ts">
	interface Props {
		class?: string;
		placeholder?: string;
		stretched?: boolean;
		powered?: boolean;
		value?: string;
	}

	let {
		class: className = '',
		placeholder = '',
		stretched = false,
		powered = false,
		value = $bindable('')
	}: Props = $props();
</script>

<input type="text" {placeholder} class:stretched class:powered class={className} bind:value />

<style>
	input {
		border: 1px solid var(--color-border-default);
		padding: var(--spacing-2);
		outline: none;
		background-color: var(--color-bg-default);
		font-size: var(--font-size-md);
		line-height: var(--line-height-md);
	}

	input::placeholder {
		color: var(--color-text-secondary);
		font-weight: 400;
		text-transform: none;
		font-style: normal;
	}

	.stretched {
		width: 100%;
		display: block;
	}

	.powered {
		font-weight: 900;
		text-transform: uppercase;
		font-style: italic;
	}
</style>
