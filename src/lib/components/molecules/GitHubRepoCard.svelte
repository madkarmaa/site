<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	import type { GitHubRepo } from '$lib/github/schemas';

	import Star from '~icons/material-symbols/star-rounded';
	import Fork from '~icons/material-symbols/call-split-rounded';
	import BrokenHeart from '~icons/material-symbols/heart-broken-rounded';

	type Props = { repo: GitHubRepo; showDelay?: number };
	let { repo, showDelay = 0 }: Props = $props();

	let show = $state(false);
	let imageLoaded = $state(false);
	let imageErrored = $state(false);
	onMount(() => setTimeout(() => (show = true), showDelay));
</script>

{#if show}
	<a
		href={repo.html_url}
		target="_blank"
		rel="noopener noreferrer external"
		class="group block overflow-hidden rounded-md border-2 border-secondary-950 bg-background-100 transition-colors hover:border-accent-700"
		transition:fly={{ y: 20, duration: 200 }}
	>
		<div class="relative overflow-hidden">
			{#if !imageLoaded || imageErrored}
				<div
					class="pointer-events-none absolute inset-0 z-0 flex items-center justify-center text-accent-700"
				>
					<BrokenHeart class="size-16" />
				</div>
			{/if}

			<div
				class="pointer-events-none absolute top-2 right-2 z-10 flex items-center justify-center gap-1 rounded-md bg-background-800 px-2 py-1 text-xs text-text-50 transition-colors select-none group-hover:bg-accent-700"
			>
				<Star class="size-4" />
				{repo.stargazers_count}
			</div>

			<div
				class="pointer-events-none absolute top-2 left-2 z-10 flex items-center justify-center gap-1 rounded-md bg-background-800 px-2 py-1 text-xs text-text-50 select-none"
			>
				<Fork class="size-4" />
				{repo.forks_count}
			</div>

			<img
				alt="GitHub Repo Card"
				src={repo.picture_url}
				class={`h-auto w-full object-cover transition-[transform,opacity] duration-200 group-hover:scale-103 ${
					imageLoaded && !imageErrored ? 'opacity-100' : 'opacity-0'
				}`}
				onload={() => (imageLoaded = true)}
				onerror={() => {
					imageErrored = true;
					imageLoaded = false;
				}}
			/>
		</div>

		<div class="flex flex-col gap-3 p-5">
			<h3
				class="jetbrains-mono-600 text-xl text-text-700 transition-colors group-hover:text-accent-700"
			>
				{repo.name}
			</h3>
			<p class="text-sm text-text-950">{repo.description ?? '<no-description />'}</p>

			{#if repo.topics.length}
				<div class="flex max-h-6 flex-wrap gap-2 overflow-hidden">
					{#each repo.topics as topic, i (i)}
						<div
							class="pointer-events-none rounded-md bg-background-800 px-2 py-1 text-xs whitespace-nowrap text-text-50 select-none"
						>
							{topic}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</a>
{/if}

<style>
	img {
		aspect-ratio: 2 / 1;
	}
</style>
