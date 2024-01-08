<script lang="ts">
    import Icon from "$lib/components/ui/Icon/Icon.svelte";
    import InputText from "$lib/components/ui/InputText/InputText.svelte";

    let className = "";
    export { className as class }
    export let username = "";
    export let color = "";
</script>

<style>
    div {
        display: flex;
        align-items: center;
        gap: var(--spacing-4);
    }
</style>

<div class={className} style="--svg-fill: #{color}">
    <Icon name="car" width="2rem" height="100%" />
    <InputText placeholder="Saisis ton pseudo" stretched powered bind:value={username}/>
</div>
