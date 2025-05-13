<script lang="ts">
	import type { LinkTarget } from '.';
	import { goto } from '$app/navigation';

	type Props = {
		text: string;
		href: string;
		decor?: boolean;
	} & (
		| {
				href: `http${string}`;
				target?: LinkTarget;
		  }
		| {
				href: Exclude<string, `http${string}`>;
				target?: never;
		  }
	);

	let { text, href, decor = false, target = '_blank' }: Props = $props();
	const isExternal = href.startsWith('http');

	function handleClick(e: MouseEvent) {
		if (isExternal) return;

		e.preventDefault();
		goto(href);
	}
</script>

<a {href} target={isExternal ? target : undefined} onclick={handleClick}>
	{#if decor}
		<span class="decor text-primary transition-all">#</span>
	{/if}
	<span class="link-text" class:text-primary={!decor}>{text}</span>
</a>

<style>
	a:hover .decor {
		color: var(--accent);
	}

	a:hover .link-text {
		text-decoration: underline;
	}
</style>
