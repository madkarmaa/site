import { ok, err } from '@madkarma/ts-utils/result';
import {
	GitHubErrorResponseSchema,
	GitHubRepoSchema,
	GitHubUserSchema,
	type GitHubRepo
} from './schemas';
import { API_BASE_URL, ERROR_CODES } from './constants';

export const MAX_HIGHLIGHTED_REPOS = 4 as const;

export const userUrl = (username: string) => `${API_BASE_URL}/users/${username.trim()}` as const;
export const fetchGitHubUser = async (username: string) => {
	try {
		const response = await fetch(userUrl(username));
		if (!response.ok) {
			const data = await response.json();
			const errorResponse = GitHubErrorResponseSchema.parse(data);
			return err({
				code: ERROR_CODES.FETCH,
				message: errorResponse.message,
				status: response.status
			});
		}

		const data = await response.json();

		const userResult = GitHubUserSchema.safeParse(data);
		if (!userResult.success) {
			return err({
				code: ERROR_CODES.PARSE,
				message: 'Failed to parse user data',
				details: userResult.error.issues
			});
		}

		return ok(userResult.data);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error while fetching user';
		return err({ code: ERROR_CODES.UNKNOWN, message });
	}
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

type Options = {
	showForks?: boolean;
	showArchived?: boolean;
	highlights?: string[];
	ignore?: string[];
};
export const fetchGitHubUserRepos = async (username: string, options: Options = {}) => {
	const opts: Required<Options> = {
		showForks: false,
		showArchived: false,
		highlights: [],
		ignore: [],
		...options
	};

	opts.highlights = opts.highlights
		.map((h) => h.trim())
		.filter((h) => h)
		.slice(0, MAX_HIGHLIGHTED_REPOS);

	opts.ignore = opts.ignore.map((i) => i.trim()).filter((i) => i);

	try {
		const response = await fetch(userReposUrl(username));
		if (!response.ok) {
			const data = await response.json();
			const errorResponse = GitHubErrorResponseSchema.parse(data);
			return err({
				code: ERROR_CODES.FETCH,
				message: errorResponse.message,
				status: response.status
			});
		}

		const data = await response.json();
		const reposResult = GitHubRepoSchema.array().safeParse(data);

		if (!reposResult.success) {
			return err({
				code: ERROR_CODES.PARSE,
				message: 'Failed to parse user repositories',
				details: reposResult.error.issues
			});
		}

		let repos = reposResult.data;

		if (!opts.showForks) repos = repos.filter((repo) => !repo.fork);
		if (!opts.showArchived) repos = repos.filter((repo) => !repo.archived);
		repos = repos.filter((repo) => !opts.ignore.includes(repo.name));
		repos = repos.sort(orderReposByPushedAt('desc'));
		if (opts.highlights.length) repos = highlightRepos(repos, opts.highlights);

		return ok(repos);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Unknown error while fetching user repositories';
		return err({ code: ERROR_CODES.UNKNOWN, message });
	}
};
export type GitHubUserReposResult = Awaited<ReturnType<typeof fetchGitHubUserRepos>>;
