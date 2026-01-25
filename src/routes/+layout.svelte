<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import favicon from '$assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>{page.url.pathname}</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
