<script lang="ts">
	import './layout.css';

	import { page } from '$app/state';
	import favicon from '#assets/favicon.ico';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>~{page.url.pathname}</title>
	<link rel="shortcut icon" href={favicon} type="image/x-icon" />
</svelte:head>

{@render children()}
