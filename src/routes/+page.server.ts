import { GITHUB_TOKEN } from '$app/env/private';
import { PUBLIC_GITHUB_USERNAME } from '$app/env/public';
import { fetchGitHubPinnedRepos } from '#lib/github/index.js';
import type { PageServerLoad } from './$types';

// runs once at build time, since the page is prerendered
export const load: PageServerLoad = async () => {
	if (!GITHUB_TOKEN) {
		console.warn('GITHUB_TOKEN is not set, pinned repos will not be highlighted');
		return { pinnedRepos: [] };
	}

	const pinnedRepos = await fetchGitHubPinnedRepos(PUBLIC_GITHUB_USERNAME, GITHUB_TOKEN)
		.inspectErr((error) => console.warn(`Failed to fetch pinned repos: ${error.message}`))
		.unwrapOr([]);

	return { pinnedRepos };
};
