<script lang="ts">
    export let title = "";
</script>

<style>

    .card {
        border: 1px solid #000;
        background-color: #FFF;
    }

    .header {
        padding: 1rem;
        background-color: #5693EE;
        color: #FFF;
        text-transform: uppercase;
        font-weight: 900;
        font-style: italic;
        font-size: 1.125rem;
    }

    .body {
        padding: 1rem;
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