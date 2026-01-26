<script lang="ts">
	import type { PageProps } from './$types';
	import GitHubRepoCard from '$components/molecules/GitHubRepoCard.svelte';

	let { data }: PageProps = $props();
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each data.repos as repo (repo.id)}
		<GitHubRepoCard {repo} />
	{/each}
</div>
