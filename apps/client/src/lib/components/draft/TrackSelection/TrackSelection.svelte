<script lang="ts">
    import { createEventDispatcher } from "svelte";
	import classnames from "classnames";

	import TrackPreview from "$lib/components/draft/TrackPreview/TrackPreview.svelte";
	import Button from "$lib/components/ui/Button/Button.svelte";
	import Icon from "$lib/components/ui/Icon/Icon.svelte";

    let className: string | undefined = undefined;
    export { className as class };

    const dispatch = createEventDispatcher();

    const handleDrawClick = () => {
        dispatch('draw');
    }

    const handleSubmit = () => {
        dispatch('submit');
    }

</script>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
    }
    .inner {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: var(--spacing-5);
        width: 100%;
        max-width: 800px;
        margin: auto;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-4);
        width: 100%;
        max-width: 800px;
        margin: auto;
        margin-top: 2rem;
    }
</style>

<div class={classnames("wrapper", className)}>
    <div class="inner">
        <TrackPreview />
        <TrackPreview />
        <TrackPreview />
        <TrackPreview />
        <TrackPreview />
        <TrackPreview />
    </div>
    <div class="buttons">
        <Button variant="primary-reversed" on:click={handleDrawClick}><Icon name="pen"/>Editeur de circuit</Button>
        <Button on:click={handleSubmit}>C'est parti !</Button>
    </div>
</div>