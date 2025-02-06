<script lang="ts">
	import clsx from "clsx";

    type Level = "h1"|"h2"|"h3"|"span"
    type Variant = "huge"|"h1"|"h2"|"h3"

    
    interface Props {
        class?: string;
        variant?: Variant;
        level?: Level;
        center?: boolean;
        stretched?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        class: className = "",
        variant = "h1",
        level = "h1",
        center = false,
        stretched = false,
        children
    }: Props = $props();
</script>

<style>
    .t {
        margin: 0;
    }

    .huge {
        font-size: 3rem;
        color: var(--color-text-default);
        font-style: italic;
        font-weight: 900;
        text-transform: uppercase;
    }

    .h1 {
        font-size: var(--font-size-4xl);
        line-height: var(--line-height-4xl);
        color: var(--color-text-default);
        font-style: italic;
        font-weight: 900;
        text-transform: uppercase;
    }

    .center {
        text-align: center;
    }

    .stretched {
        width: 100%;
    }
</style>

<svelte:element this={level} class={clsx("t", variant, className)} class:center class:stretched>
    {@render children?.()}
</svelte:element>