<script lang="ts">
	import type { PageProps } from './$types';
	import GitHubRepoCard from '$components/molecules/GitHubRepoCard.svelte';

	let { data }: PageProps = $props();
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#if data.repos[0]}
		{#each data.repos[0] as repo (repo.id)}
			<GitHubRepoCard {repo} />
		{/each}
	{:else}
		<p class="col-span-full text-center text-gray-500">{data.repos[1].error}</p>
	{/if}
</div>
