<script lang="ts">
	import { onMount } from 'svelte';

	import { PUBLIC_GITHUB_USERNAME, PUBLIC_LASTFM_USERNAME } from '$app/env/public';
	import { prefetchImages } from '#lib/utils/index.js';
	import {
		fetchGitHubUser,
		fetchGitHubUserRepos,
		DEFAULT_VISIBLE_REPOS
	} from '#lib/github/index.js';
	import { type GitHubRepo } from '#lib/github/schemas.js';
	import type { PageProps } from './$types';

	import GitHubRepoCard from '#components/molecules/GitHubRepoCard.svelte';
	import Section from '#components/molecules/Section.svelte';
	import Landing, { type Button } from '#components/organisms/Landing.svelte';
	import SkillCard, { type Props as Skill } from '#components/molecules/SkillCard.svelte';
	import Embed from '#components/molecules/Embed.svelte';
	import PlayerMiniCard from '#components/molecules/PlayerMiniCard.svelte';

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
	import Key from '~icons/material-symbols/key-outline-rounded';

	const buttons = [
		{ label: 'GitHub', href: `https://github.com/${PUBLIC_GITHUB_USERNAME}`, icon: GitHub },
		{ label: 'Email', href: 'mailto:me@madkarma.top', icon: Email },
		{ label: 'GPG key', href: `https://github.com/${PUBLIC_GITHUB_USERNAME}.gpg`, icon: Key }
	] satisfies Button[];

	const skills = [
		{ label: 'TypeScript', icon: TypeScript },
		{ label: 'Svelte', icon: Svelte },
		{ label: 'Tailwind CSS', icon: TailwindCSS },
		{ label: 'Python', icon: Python },
		{ label: 'C#', icon: CSharp },
		{ label: 'Git', icon: Git }
	] satisfies Skill[];

	let { data }: PageProps = $props();

	const pinnedRepos = $derived(new Set(data.pinnedRepos.map((repo) => repo.toLowerCase())));

	// show the pinned repos (they're sorted first), or a few recent ones if none are pinned
	const visibleRepoCount = (repos: GitHubRepo[]) =>
		repos.filter((repo) => pinnedRepos.has(repo.full_name.toLowerCase())).length ||
		DEFAULT_VISIBLE_REPOS;

	let showAllProjects = $state(false);

	let displayName = $state(PUBLIC_GITHUB_USERNAME);
	let company = $state<string | null>(null);

	let reposRequest = $state<ReturnType<typeof fetchGitHubUserRepos>>();

	onMount(() => {
		fetchGitHubUser(PUBLIC_GITHUB_USERNAME).inspect((user) => {
			displayName = user.name ?? user.login;
			company = user.company;
		});

		reposRequest = fetchGitHubUserRepos(PUBLIC_GITHUB_USERNAME, {
			highlights: data.pinnedRepos,
			ignore: [PUBLIC_GITHUB_USERNAME]
		});

		reposRequest.inspect((repos) =>
			prefetchImages(...repos.slice(visibleRepoCount(repos)).map((repo) => repo.picture_url))
		);
	});
</script>

{#snippet message(msg: string)}
	<p class="col-span-full text-center text-2xl text-accent-800">{msg.trim()}</p>
{/snippet}

{#snippet descLink(href: string, label: string)}
	<a
		href={href.trim()}
		rel="noopener noreferrer external"
		target="_blank"
		class="text-accent-800 underline decoration-dotted"
	>
		{label.trim()}
	</a>
{/snippet}

<Embed
	title="MadKarma"
	description="Self-taught full-stack developer"
	url="https://madkarma.top"
	image="https://madkarma.top/EcWBgAdRqrQ.jpg"
/>

<main
	class="mx-auto flex min-h-screen max-w-[90%] flex-col gap-10 px-0 py-12 md:max-w-[80%] md:px-5"
>
	<Landing {buttons}>
		{#snippet title()}
			Sup,
			<span class="text-accent-800">{displayName}</span>
			here!
		{/snippet}
		{#snippet short()}
			I'm a self-taught full-stack developer based in
			<span class="text-accent-800 underline decoration-dotted">Italy</span>
			who loves building cool stuff on the web
			<span class="text-accent-800 italic">and beyond</span>.
			{#if company}
				I'm currently working at {@render descLink(
					`https://github.com/${company}`,
					company
				)}.
			{/if}
			I love building whatever crosses my mind and am always open to learning new things.
		{/snippet}
		{#snippet long()}
			Outside of coding, I'm an obsessed {@render descLink(
				'http://gym-rat.urbanup.com/4855932',
				'gym rat'
			)} &#40;yes, <span class="italic">really</span>&#41;. I also love photography and
			videography; there's something special about capturing moments in time. See you at the
			gym, I guess
			<span class="text-accent-800">;&#41;</span>
		{/snippet}
	</Landing>

	<PlayerMiniCard username={PUBLIC_LASTFM_USERNAME} />

	<Section title="Projects" icon={Code}>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#if reposRequest}
				{#await reposRequest}
					{@render message('Loading...')}
				{:then result}
					{@const repos = result.unwrapOr([])}
					{@const visibleCount = visibleRepoCount(repos)}

					{#if result.isErr()}
						{@render message(result.unwrapErr().message)}
					{:else if !repos.length}
						{@render message('No repositories found.')}
					{:else}
						{#each showAllProjects ? repos : repos.slice(0, visibleCount) as repo, i (repo.id)}
							<GitHubRepoCard {repo} showDelay={i * 50} />
						{/each}

						{#if repos.length > visibleCount}
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
		<div
			class="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
		>
			{#each skills as skill, i (i)}
				<SkillCard {...skill} showDelay={i * 50} />
			{/each}
		</div>
	</Section>
</main>
