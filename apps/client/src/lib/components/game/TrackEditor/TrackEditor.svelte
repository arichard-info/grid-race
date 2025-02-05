<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	import type Game from "gameboard/src/js";
	import { Mode } from "gameboard/src/js";
	import Button from "$lib/components/ui/Button/Button.svelte";

    export let gameboard: Game | undefined;
    let initialMode : string | undefined;

    onMount(() => {
        initialMode = gameboard?.mode;
        if (gameboard && initialMode !== Mode.Editor) {
            gameboard.changeMode(Mode.Editor);
        }
    })

    onDestroy(() => {
        if(gameboard && initialMode) gameboard.changeMode(initialMode);
    })
</script>

<style>
    div {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 1rem;
    }
</style>

    <div>
        <Button variant="primary-reversed">
            Annuler
        </Button>
        <Button>
            Valider
        </Button>
    </div>

