<script lang="ts">
	import { fetchGitHubUserRepos } from '$lib/github';
	import GitHubRepoCard from '$components/molecules/GitHubRepoCard.svelte';
	import Section from '$components/atoms/Section.svelte';
	import { PUBLIC_GITHUB_USERNAME } from '$env/static/public';
	import { onMount } from 'svelte';

	let reposPromise: ReturnType<typeof fetchGitHubUserRepos> | undefined;
	onMount(() => {
		reposPromise = fetchGitHubUserRepos(PUBLIC_GITHUB_USERNAME);
	});
</script>

{#snippet message(msg: string)}
	<p class="col-span-full text-center text-2xl text-accent-800">{msg.trim()}</p>
{/snippet}

<main class="mx-auto flex max-w-[90%] flex-col px-0 py-8 md:max-w-[80%] md:px-5">
	<Section title="Projects">
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#if reposPromise}
				{#await reposPromise}
					{@render message('Loading...')}
				{:then [repos, error]}
					{#if error}
						{@render message(error.message)}
					{:else if !repos.length}
						{@render message('No repositories found.')}
					{:else}
						{#each repos as repo, i (repo.id)}
							<GitHubRepoCard {repo} delay={i * 50} />
						{/each}
					{/if}
				{/await}
			{:else}
				{@render message('Loading...')}
			{/if}
		</div>
	</Section>
</main>
