<script lang="ts">
    import { icons } from "./Icon.config";

    export let name: string;
    export let width = "1rem";
    export let height: string|null = null;

    const icon = icons[name];
</script>

<style>
    svg {
        fill: var(--svg-fill);
    }
</style>

<svg xmlns="http://www.w3.org/2000/svg" {width} {height} viewBox={icon.viewBox}>{@html icon.svg}</svg>