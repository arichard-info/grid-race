<script lang="ts">
	import { icons } from './Icon.config';

	interface Props {
		name: string;
		width?: string;
		height?: string | null;
	}

	let { name, width = '1rem', height = null }: Props = $props();

	const icon = icons[name];
</script>

<svg xmlns="http://www.w3.org/2000/svg" {width} {height} viewBox={icon.viewBox}
	>{@html icon.svg}</svg
>

<style>
	svg {
		fill: var(--svg-fill);
	}
</style>
