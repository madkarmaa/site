<script lang="ts">
	import { fetchGitHubUser, fetchGitHubUserRepos } from '$lib/github';
	import GitHubRepoCard from '$components/molecules/GitHubRepoCard.svelte';
	import Section from '$components/atoms/Section.svelte';
	import { PUBLIC_GITHUB_USERNAME } from '$env/static/public';
	import { onMount } from 'svelte';
	import Landing, { type Button } from '$components/organisms/Landing.svelte';
	import Code from '~icons/material-symbols/code-rounded';
	import GitHub from '~icons/mdi/github';
	import Email from '~icons/material-symbols/alternate-email-rounded';

	const buttons = [
		{ label: 'GitHub', href: `https://github.com/${PUBLIC_GITHUB_USERNAME}`, icon: GitHub },
		{ label: 'Email', href: 'mailto:me@madkarma.top', icon: Email }
	] satisfies Button[];

	let userPromise: ReturnType<typeof fetchGitHubUser> | undefined;
	let reposPromise: ReturnType<typeof fetchGitHubUserRepos> | undefined;
	onMount(() => {
		userPromise = fetchGitHubUser(PUBLIC_GITHUB_USERNAME);
		reposPromise = fetchGitHubUserRepos(PUBLIC_GITHUB_USERNAME);
	});
</script>

{#snippet message(msg: string)}
	<p class="col-span-full text-center text-2xl text-accent-800">{msg.trim()}</p>
{/snippet}

<main class="mx-auto flex max-w-[90%] flex-col gap-10 px-0 py-8 md:max-w-[80%] md:px-5">
	<Landing {buttons}>
		{#snippet title()}
			Sup,
			<span class="text-text-700">
				{#if userPromise}
					{#await userPromise}
						{PUBLIC_GITHUB_USERNAME}
					{:then [user, error]}
						{#if error}
							{PUBLIC_GITHUB_USERNAME}
						{:else}
							{user.name ?? user.login}
						{/if}
					{/await}
				{:else}
					{PUBLIC_GITHUB_USERNAME}
				{/if}
			</span>
			here!
		{/snippet}
		{#snippet description()}
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam eligendi minima accusantium
				id? Saepe hic sit dicta libero blanditiis corrupti delectus doloremque laborum illum sed.
				Odit assumenda eius fugiat quas.
			</p>
		{/snippet}
	</Landing>

	<Section title="Projects" icon={Code}>
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
							<GitHubRepoCard {repo} showDelay={i * 50} />
						{/each}
					{/if}
				{/await}
			{:else}
				{@render message('Loading...')}
			{/if}
		</div>
	</Section>
</main>
