<script lang="ts">
  import { onMount } from "svelte";
  import { components, loading, init as initRouter } from "./router";

  onMount(async () => {
    await initRouter();
  });
</script>

{#if $components && $components.layout}
  <svelte:component this={$components.layout.default}>
    {#if $loading}
      ...loading
    {:else if $components.main}
      <svelte:component
        this={$components.main.default}
        {...$components.props}
      />
    {:else}
      ERROR
    {/if}
  </svelte:component>
{/if}
