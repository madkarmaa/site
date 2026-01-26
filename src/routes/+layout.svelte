<script lang="ts">
	import './layout.css';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import favicon from '$assets/favicon.svg';

	type Props = { children: Snippet };
	let { children }: Props = $props();
</script>

<svelte:head>
	<title>{page.url.pathname}</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
