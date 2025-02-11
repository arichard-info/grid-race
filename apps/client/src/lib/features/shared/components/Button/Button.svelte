<script lang="ts">
	import clsx from "clsx";

    type ButtonVariant = "primary" | "secondary" | "primary-reversed"

    
    interface Props {
        class?: string;
        stretched?: boolean;
        variant?: ButtonVariant;
        href?: string | undefined;
        border?: boolean;
        children?: import('svelte').Snippet;
        onclick?: () => void
    }

    let {
        class: className = "",
        stretched = false,
        variant = "primary",
        href = undefined,
        border = false,
        children,
        onclick
    }: Props = $props();
</script>

<style>
    button, a {
        font-size: var(--font-size-md);
        line-height: var(--line-height-md);
        font-weight: 700;
        padding: var(--spacing-2) var(--spacing-4);
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-1\.5);
    }

    button:not(.border), a:not(.border) {
        border: none;
    }

    .border {
        border: 1px solid var(--color-border-default);
    }

    .primary {
        background-color: var(--color-bg-primary);
        color: var(--color-text-reversed);
    }

    .primary-reversed {
        background-color: var(--color-bg-default);
        color: var(--color-text-default);
    }

    .secondary {
        color: var(--color-text-default);
        background-color: var(--color-bg-secondary);
    }

    .stretched {
        width: 100%;
    }
</style>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element this={!!href ? "a" : "button"} class:stretched class:border class={clsx(className, variant)} {href} {onclick}>
    {@render children?.()}
</svelte:element>