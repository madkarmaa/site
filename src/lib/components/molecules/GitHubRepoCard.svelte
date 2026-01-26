<script lang="ts">
	import type { GitHubRepo } from '$lib/github/schemas';
	import Star from '~icons/material-symbols/star-rounded';
	import Fork from '~icons/material-symbols/call-split-rounded';

	type Props = { repo: GitHubRepo };
	let { repo }: Props = $props();
</script>

<a
	href={repo.html_url}
	target="_blank"
	rel="noopener noreferrer external"
	class="group block overflow-hidden rounded-md border-2 border-secondary-950 transition-colors duration-200 hover:border-accent-700"
>
	<div class="relative overflow-hidden">
		<div
			class="absolute top-2 right-2 z-10 flex items-center justify-center gap-1 rounded-md bg-background-800 px-2 py-1 text-xs text-text-50 transition-colors duration-200 group-hover:bg-accent-700"
		>
			<Star class="h-4 w-4" />
			{repo.stargazers_count}
		</div>
		<div
			class="absolute top-2 left-2 z-10 flex items-center justify-center gap-1 rounded-md bg-background-800 px-2 py-1 text-xs text-text-50"
		>
			<Fork class="h-4 w-4" />
			{repo.forks_count}
		</div>
		<img
			alt="GitHub Repo Card"
			src={repo.picture_url}
			class="h-auto w-full transition-transform duration-200 group-hover:scale-103"
		/>
	</div>

	<div class="flex flex-col gap-3 p-5">
		<h2
			class="jetbrains-mono-600 text-xl text-text-700 transition-colors duration-200 group-hover:text-accent-700"
		>
			{repo.name}
		</h2>
		<p class="text-sm text-text-950">{repo.description ?? '<no-description />'}</p>

		{#if repo.topics.length}
			<div class="flex max-h-6 flex-wrap gap-2 overflow-hidden">
				{#each repo.topics as topic, i (i)}
					<div
						class="rounded-md bg-background-800 px-2 py-1 text-xs whitespace-nowrap text-text-50"
					>
						{topic}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</a>
