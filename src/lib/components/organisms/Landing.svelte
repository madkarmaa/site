<script lang="ts">
	import { type Snippet, onMount } from 'svelte';

	import { getCount, incrementCount } from '$lib/counter';

	import ArrowDown from '~icons/material-symbols/arrow-downward-rounded';
	import ArrowUp from '~icons/material-symbols/arrow-upward-rounded';

	export type Button = { label: string; href: string; icon: typeof import('~icons/*').default };

	type Props = {
		title: Snippet;
		short: Snippet;
		long?: Snippet;
		buttons?: Button[];
	};
	let { title, short, long, buttons }: Props = $props();

	let showLong = $state(false);
	let count = $state(0);

	const increment = async () => {
		const { value: newCount, error } = await incrementCount();
		if (!error) count = newCount;
	};

	onMount(async () => {
		const { value: initialCount, error } = await getCount();
		if (!error) count = initialCount;
	});
</script>

{#snippet sep()}
	<span class="pointer-events-none text-accent-800 select-none">|</span>
{/snippet}

<div class="flex flex-col gap-6">
	<h1 class="jetbrains-mono-700 text-3xl">{@render title()}</h1>
	<p class="max-w-prose text-base md:text-lg">
		{#if long && showLong}
			{@render short()}
			{@render long()}
		{:else}
			{@render short()}
		{/if}
	</p>

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

				{@render sep()}
			{/each}

			<button
				class="flex cursor-pointer items-center gap-3 select-none hover:underline"
				onclick={increment}>{count}</button
			>

			{#if long}
				{@render sep()}
				<button
					type="button"
					onclick={() => (showLong = !showLong)}
					class="flex cursor-pointer items-center gap-3 select-none hover:underline"
				>
					{#if showLong}
						Show less
						<ArrowUp class="text-text-800 transition-transform duration-200" />
					{:else}
						Read more
						<ArrowDown class="text-text-800 transition-transform duration-200" />
					{/if}
				</button>
			{/if}
		</div>
	{/if}
</div>
