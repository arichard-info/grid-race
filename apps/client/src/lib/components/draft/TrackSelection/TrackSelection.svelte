<script lang="ts">
    import { createEventDispatcher } from "svelte";
	import classnames from "classnames";

	import TrackPreview from "$lib/components/draft/TrackPreview/TrackPreview.svelte";

    let className = "";
    export { className as class };

    const dispatch = createEventDispatcher();

    const handleDrawClick = () => {
        dispatch('draw');
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
</style>

<div class={classnames("wrapper", className)}>
    <div class="inner">
        <TrackPreview />
        <TrackPreview />
        <TrackPreview />
        <TrackPreview />
        <TrackPreview />
        <TrackPreview on:click={handleDrawClick} />
    </div>
</div>