<script lang="ts">
    let className = "";
    export { className as class }
    export let placeholder = "";
    export let stretched = false;
    export let powered = false;
    export let value = "";
</script>

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

<input type="text" {placeholder} class:stretched class:powered class={className} bind:value/>