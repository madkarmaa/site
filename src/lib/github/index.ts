import {
	GitHubErrorResponseSchema,
	GitHubRepoSchema,
	GitHubUserSchema,
	type GitHubRepo
} from './schemas';

const API_BASE_URL = 'https://api.github.com' as const;
export const MAX_HIGHLIGHTED_REPOS = 3 as const;

const logApiError = async (response: Response, message?: string) => {
	message = message?.trim() ?? 'GitHub API Error';

	const data = await response.json();
	const error = GitHubErrorResponseSchema.parse(data);

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

const orderReposByPushedAt = (order: 'asc' | 'desc') => (a: GitHubRepo, b: GitHubRepo) =>
	order === 'desc'
		? b.pushed_at.getTime() - a.pushed_at.getTime()
		: a.pushed_at.getTime() - b.pushed_at.getTime();

const highlightRepos = (repos: GitHubRepo[], highlights: string[]) => {
	// create a lookup table where each highlighted repo name is mapped to its priority order
	// lower index = higher priority
	const index = new Map(highlights.map((h, i) => [h.toLowerCase(), i]));

	return [...repos].sort((a, b) => {
		// get the priority index of each repo, if it exists
		const ia = index.get(a.name.toLowerCase());
		const ib = index.get(b.name.toLowerCase());

		if (ia === undefined && ib === undefined) return 0; // if neither repo is highlighted, keep their relative order
		if (ia === undefined) return 1; // if only `b` is highlighted, move it before `a`
		if (ib === undefined) return -1; // if only `a` is highlighted, move it before `b`
		return ia - ib; // if both are highlighted, order them according to their position in the `highlights` array
	});
};

export const userReposUrl = (username: string) => `${userUrl(username)}/repos` as const;

type Options = { showForks?: boolean; showArchived?: boolean; highlights?: string[] };
export const fetchGitHubUserRepos = async (username: string, options: Options = {}) => {
	const opts: Required<Options> = {
		showForks: false,
		showArchived: false,
		highlights: [],
		...options
	};

	opts.highlights = opts.highlights
		.map((h) => h.trim())
		.filter((h) => h)
		.slice(0, MAX_HIGHLIGHTED_REPOS); // limit to first 3 highlights

	const response = await fetch(userReposUrl(username));
	if (!response.ok) {
		const error = await logApiError(response, 'Error fetching user repositories');
		return [null, error] as const;
	}

	const data = await response.json();
	let repos = GitHubRepoSchema.array().parse(data);

	if (!opts.showForks) repos = repos.filter((repo) => !repo.fork);
	if (!opts.showArchived) repos = repos.filter((repo) => !repo.archived);

	repos = repos.sort(orderReposByPushedAt('desc'));

	if (opts.highlights.length) repos = highlightRepos(repos, opts.highlights);

	return [repos, null] as const;
};
export type GitHubUserReposResult = Awaited<ReturnType<typeof fetchGitHubUserRepos>>;
