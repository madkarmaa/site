<script lang="ts">
	import { fetchGitHubUser, fetchGitHubUserRepos, MAX_HIGHLIGHTED_REPOS } from '$lib/github';
	import GitHubRepoCard from '$components/molecules/GitHubRepoCard.svelte';
	import Section from '$components/atoms/Section.svelte';
	import { PUBLIC_GITHUB_USERNAME } from '$env/static/public';
	import { onMount } from 'svelte';
	import Landing, { type Button } from '$components/organisms/Landing.svelte';
	import SkillCard, { type Props as Skill } from '$components/atoms/SkillCard.svelte';
	import Code from '~icons/material-symbols/code-rounded';
	import Widgets from '~icons/material-symbols/widgets-outline-rounded';
	import GitHub from '~icons/mdi/github';
	import Email from '~icons/material-symbols/alternate-email-rounded';
	import TypeScript from '~icons/simple-icons/typescript';
	import Svelte from '~icons/simple-icons/svelte';
	import TailwindCSS from '~icons/simple-icons/tailwindcss';
	import Python from '~icons/simple-icons/python';
	import CSharp from '~icons/simple-icons/csharp';
	import Git from '~icons/simple-icons/git';

	const buttons = [
		{ label: 'GitHub', href: `https://github.com/${PUBLIC_GITHUB_USERNAME}`, icon: GitHub },
		{ label: 'Email', href: 'mailto:me@madkarma.top', icon: Email }
	] satisfies Button[];

	const skills = [
		{ label: 'TypeScript', icon: TypeScript },
		{ label: 'Svelte', icon: Svelte },
		{ label: 'Tailwind CSS', icon: TailwindCSS },
		{ label: 'Python', icon: Python },
		{ label: 'C#', icon: CSharp },
		{ label: 'Git', icon: Git }
	] satisfies Skill[];

	const highlightedRepos = ['wsg', 'site', 'BSOD'];

	let showAllProjects = $state(false);

	let userPromise: ReturnType<typeof fetchGitHubUser> | undefined = $state(undefined);
	let reposPromise: ReturnType<typeof fetchGitHubUserRepos> | undefined = $state(undefined);
	onMount(() => {
		userPromise = fetchGitHubUser(PUBLIC_GITHUB_USERNAME);
		reposPromise = fetchGitHubUserRepos(PUBLIC_GITHUB_USERNAME, {
			highlights: highlightedRepos
		});
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
		{#snippet short()}
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam eligendi minima accusantium
			id? Saepe hic sit dicta libero blanditiis corrupti delectus doloremque laborum illum sed. Odit
			assumenda eius fugiat quas.
		{/snippet}
		{#snippet long()}
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos fugit, maxime mollitia assumenda
			nobis illum at quia consequuntur expedita nulla dolorum qui, saepe omnis temporibus quasi
			distinctio reiciendis sed voluptas! Consectetur quaerat dignissimos corrupti quas perferendis
			quasi minus excepturi numquam a alias at explicabo ab, deserunt officia vel qui laborum ipsa
			sapiente illo odit! Ab architecto voluptas sint sit minima? Suscipit maiores facere nulla
			modi, dolor repellendus quis quae aut omnis aperiam vel. Aut voluptatem quas harum, aliquam
			adipisci cumque rem obcaecati ullam ipsam labore debitis mollitia, incidunt a omnis!
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
						{#each showAllProjects ? repos : repos.slice(0, MAX_HIGHLIGHTED_REPOS) as repo, i (repo.id)}
							<GitHubRepoCard {repo} showDelay={i * 50} />
						{/each}

						{#if repos.length > MAX_HIGHLIGHTED_REPOS}
							<div class="col-span-full flex items-center justify-center">
								<button
									class="cursor-pointer text-sm underline select-none"
									onclick={() => (showAllProjects = !showAllProjects)}
								>
									{showAllProjects ? 'Show less' : 'Show all'}
								</button>
							</div>
						{/if}
					{/if}
				{/await}
			{:else}
				{@render message('Loading...')}
			{/if}
		</div>
	</Section>

	<Section title="Skills" icon={Widgets}>
		<div class="grid grid-cols-3 gap-6 sm:grid-cols-6 lg:grid-cols-9">
			{#each skills as skill, i (i)}
				<SkillCard {...skill} />
			{/each}
		</div>
	</Section>
</main>
