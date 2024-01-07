<script lang="ts">
    export let title = "";
</script>

<style>

    .card {
        border: 1px solid var(--color-border-default);
        background-color: var(--color-bg-default);
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
    }
</style>

<div class="card">
    {#if title}
        <div class="header">
            <span>{title}</span>
        </div>
    {/if}
    <div class="body">
        <slot />
    </div>
</div>