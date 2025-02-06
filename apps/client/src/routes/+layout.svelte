<script lang="ts">
    import "$lib/style/global.css";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

{@render children?.()}