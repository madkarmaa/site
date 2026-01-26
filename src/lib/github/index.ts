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
export const fetchGitHubUserRepos = async (username: string, fetchFn: typeof fetch) => {
	const response = await fetchFn(userReposUrl(username));
	if (!response.ok) await throwError(response, `Error fetching user repositories`);

	const data = await response.json();
	const repos = GitHubRepoSchema.array().parse(data);
	return repos;
};
