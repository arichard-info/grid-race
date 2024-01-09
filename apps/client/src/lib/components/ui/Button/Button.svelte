<script lang="ts">
    import classnames from "classnames";

    type ButtonVariant = "primary" | "secondary" | "primary-reversed"

    let className = "";
    export { className as class };
    export let stretched = false;
    export let variant: ButtonVariant = "primary";
    export let href : string | undefined = undefined;
    export let border = false;
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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element this={!!href ? "a" : "button"} class:stretched class:border class={classnames(className, variant)} {href} on:click>
    <slot/>
</svelte:element>