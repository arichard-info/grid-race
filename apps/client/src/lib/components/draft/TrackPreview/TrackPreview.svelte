<script lang="ts">

</script>

<style>
    button {
        width: 100%;
        border: none;
        background: transparent;
        cursor: pointer;
        padding: 0;
        transition: all .2s ease;
    }

    button:hover, button:focus {
        transform: scale(1.05);
    }
    div {
        background-color: var(--color-bg-default);
        border: 1px solid var(--color-border-default);
        border-radius: .5rem;
        height: 0;
        width: 100%;
        padding-top: 70%;
    }
</style>

<button on:click>
    <div></div>
</button>