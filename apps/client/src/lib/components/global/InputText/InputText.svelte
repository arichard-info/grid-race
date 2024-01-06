<script lang="ts">
    type Size = "small" | "medium" | "large" | "stretched";

    export let placeholder = "";
    export let size: Size = "medium";
</script>

<style>
    input {
        border: 1px solid #000;
        padding: .5rem;
        outline: none;
        font-size: 0.875rem;
    }

    .stretched {
        width: 100%;
        display: block;
    }
</style>

<input type="text" {placeholder} class:stretched={size === "stretched"}/>