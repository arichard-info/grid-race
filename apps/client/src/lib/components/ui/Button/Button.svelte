<script lang="ts">
    import classnames from "classnames";

    type ButtonVariant = "primary"

    let className = "";
    export { className as class };
    export let stretched = false;
    export let variant: ButtonVariant = "primary";
    export let href : string | undefined = undefined;
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
    }

    .primary {
        background-color: var(--color-bg-primary);
        border: none;
        color: var(--color-text-reversed);
    }

    .stretched {
        display: block;
        width: 100%;
    }
</style>

<svelte:element this={!!href ? "a" : "button"} class:stretched class={classnames(className, variant)} {href}>
    <slot/>
</svelte:element>