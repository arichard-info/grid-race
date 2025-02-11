<script lang="ts">
	import clsx from "clsx";
    
    interface Props {
        class?: string;
        title?: string;
        children?: import('svelte').Snippet;
        footer?: import('svelte').Snippet;
    }

    let {
        class: className = "",
        title = "",
        children,
        footer
    }: Props = $props();
</script>

<style>

    .card {
        border: 1px solid var(--color-border-default);
        background-color: var(--color-bg-default);
        display: flex;
        flex-direction: column;
    }

    .header {
        padding: var(--spacing-4);
        background-color: var(--color-bg-primary);
        color: var(--color-text-reversed);
        text-transform: uppercase;
        font-weight: 900;
        font-style: italic;
        font-size: var(--font-size-xl);
        border-bottom: 1px solid var(--color-border-default);
    }

    .body {
        padding: var(--spacing-4);
        flex-grow: 1;
    }

    .footer {
        padding: 0 var(--spacing-4) var(--spacing-4);
    }
</style>

<div class={clsx("card", className)}>
    {#if title}
        <div class="header">
            <span>{title}</span>
        </div>
    {/if}
    <div class="body">
        {@render children?.()}
    </div>

    {#if footer}
        <div class="footer">
            {@render footer?.()}
        </div>
    {/if}
</div>