import { fetchGitHubUser, fetchGitHubUserRepos } from '$lib/github';
import type { PageLoad } from './$types';
import { PUBLIC_GITHUB_USERNAME } from '$env/static/public';

export const load: PageLoad = async ({ fetch }) => {
	const user = await fetchGitHubUser(PUBLIC_GITHUB_USERNAME, fetch);
	const repos = await fetchGitHubUserRepos(PUBLIC_GITHUB_USERNAME, fetch);
	return { user, repos };
};
