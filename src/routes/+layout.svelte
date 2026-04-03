<script lang="ts">
	import { base } from '$app/paths';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={`${base}/favicon/favicon-32x32.png`} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</svelte:head>

{@render children()}
