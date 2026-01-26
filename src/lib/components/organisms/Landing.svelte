<script lang="ts">
	import type { Snippet } from 'svelte';

	export type Button = { label: string; href: string; icon: typeof import('~icons/*').default };

	type Props = {
		title: Snippet;
		description: Snippet;
		buttons?: Button[];
	};
	let { title, description, buttons }: Props = $props();
</script>

<div class="flex flex-col gap-6">
	<h1 class="jetbrains-mono-700 text-3xl">{@render title()}</h1>
	<div class="max-w-prose text-lg">{@render description()}</div>

	{#if buttons && buttons.length}
		<div class="flex flex-wrap gap-4 text-sm">
			{#each buttons as { label, href, icon: Icon }, i (i)}
				<a
					{href}
					class="flex items-center gap-3 hover:underline"
					rel="noopener noreferrer external"
					target="_blank"
				>
					<Icon class="text-text-800" />
					{label}
				</a>

				{#if i < buttons.length - 1}
					<span class="text-accent-800">|</span>
				{/if}
			{/each}
		</div>
	{/if}
</div>
