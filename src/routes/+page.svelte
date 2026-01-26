<script lang="ts">
	import type { PageProps } from './$types';
	import GitHubRepoCard from '$components/molecules/GitHubRepoCard.svelte';

	let { data }: PageProps = $props();
</script>

<main class="mx-auto flex max-w-[90%] flex-col px-0 py-8 md:max-w-[80%] md:px-5">
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#if data.repos[0]}
			{#each data.repos[0] as repo (repo.id)}
				<GitHubRepoCard {repo} />
			{/each}
		{:else}
			<p class="col-span-full text-center text-accent-500">{data.repos[1].error}</p>
		{/if}
	</div>
</main>
