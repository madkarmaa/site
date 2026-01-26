import { ErrorResponseSchema, GitHubRepoSchema, GitHubUserSchema } from './schemas';

const API_BASE_URL = 'https://api.github.com' as const;

const logApiError = async (response: Response, message?: string) => {
	message = message?.trim() ?? 'GitHub API Error';

	const data = await response.json();
	const error = ErrorResponseSchema.parse(data);

	console.error(`[${response.status}] ${message}:\n\n${error.message}`);

	return { message: error.message, status: response.status } as const;
};

export const userUrl = (username: string) => `${API_BASE_URL}/users/${username.trim()}` as const;
export const fetchGitHubUser = async (username: string) => {
	const response = await fetch(userUrl(username));
	if (!response.ok) {
		const error = await logApiError(response, 'Error fetching user');
		return [null, error] as const;
	}

	const data = await response.json();
	const user = GitHubUserSchema.parse(data);
	return [user, null] as const;
};
export type GitHubUserResult = Awaited<ReturnType<typeof fetchGitHubUser>>;

export const userReposUrl = (username: string) => `${userUrl(username)}/repos` as const;

type Options = { showForks?: boolean; showArchived?: boolean };
export const fetchGitHubUserRepos = async (username: string, options: Options = {}) => {
	const opts: Required<Options> = { showForks: false, showArchived: false, ...options };

	const response = await fetch(userReposUrl(username));
	if (!response.ok) {
		const error = await logApiError(response, 'Error fetching user repositories');
		return [null, error] as const;
	}

	const data = await response.json();
	let repos = GitHubRepoSchema.array().parse(data);

	if (!opts.showForks) repos = repos.filter((repo) => !repo.fork);
	if (!opts.showArchived) repos = repos.filter((repo) => !repo.archived);

	repos = repos.sort((a, b) => b.pushed_at.getTime() - a.pushed_at.getTime());

	return [repos, null] as const;
};
export type GitHubUserReposResult = Awaited<ReturnType<typeof fetchGitHubUserRepos>>;
