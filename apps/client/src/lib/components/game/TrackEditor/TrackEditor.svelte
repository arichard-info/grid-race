<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	import type Game from "gameboard/src/js";
	import { Mode } from "gameboard/src/js";

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


