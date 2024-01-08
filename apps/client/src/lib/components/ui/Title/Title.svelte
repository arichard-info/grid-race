<script lang="ts">
	import classnames from "classnames";

    type Level = "h1"|"h2"|"h3"|"span"
    type Variant = "huge"|"h1"|"h2"|"h3"

    let className = "";
    export { className as class };
    export let variant: Variant = "h1";
    export let level: Level = "h1";
    export let center = false;
    export let stretched = false;
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

<svelte:element this={level} class={classnames("t", variant, className)} class:center class:stretched>
    <slot/>
</svelte:element>