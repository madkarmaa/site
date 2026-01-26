import { ErrorResponseSchema, GitHubRepoSchema, GitHubUserSchema } from './schemas';

const API_BASE_URL = 'https://api.github.com' as const;

const throwError = async (response: Response, message?: string) => {
	message = message?.trim() ?? 'GitHub API Error';

	const data = await response.json();
	const error = ErrorResponseSchema.parse(data);

	throw new Error(`[${response.status}] ${message}:\n\n${error.message}`);
};

export const userUrl = (username: string) => `${API_BASE_URL}/users/${username.trim()}` as const;
export const fetchGitHubUser = async (username: string, fetchFn: typeof fetch) => {
	const response = await fetchFn(userUrl(username));
	if (!response.ok) await throwError(response, `Error fetching user`);

	const data = await response.json();
	const user = GitHubUserSchema.parse(data);
	return user;
};

export const userReposUrl = (username: string) => `${userUrl(username)}/repos` as const;

type Options = { showForks?: boolean; showArchived?: boolean };
export const fetchGitHubUserRepos = async (
	username: string,
	fetchFn: typeof fetch,
	options: Options = {}
) => {
	const opts: Required<Options> = { showForks: false, showArchived: false, ...options };

	const response = await fetchFn(userReposUrl(username));
	if (!response.ok) await throwError(response, `Error fetching user repositories`);

	const data = await response.json();
	let repos = GitHubRepoSchema.array().parse(data);

	if (!opts.showForks) repos = repos.filter((repo) => !repo.fork);
	if (!opts.showArchived) repos = repos.filter((repo) => !repo.archived);

	repos = repos.sort((a, b) => b.pushed_at.getTime() - a.pushed_at.getTime());

	return repos;
};
