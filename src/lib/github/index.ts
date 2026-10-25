import { fetchJson } from '#lib/utils/fetch.js';
import {
	GitHubErrorResponseSchema,
	GitHubPinnedReposResponseSchema,
	GitHubRepoSchema,
	GitHubUserSchema,
	type GitHubRepo
} from './schemas';
import { API_BASE_URL, ERROR_CODES } from './constants';

/** how many repos to show before "Show all" when there are no pinned repos */
export const DEFAULT_VISIBLE_REPOS = 4 as const;

const responseErrorMessage = async (response: Response) =>
	GitHubErrorResponseSchema.parse(await response.json()).message;

export const userUrl = (username: string) => `${API_BASE_URL}/users/${username.trim()}` as const;

export const fetchGitHubUser = (username: string) =>
	fetchJson(userUrl(username), {
		schema: GitHubUserSchema,
		codes: ERROR_CODES,
		responseErrorMessage,
		parseErrorMessage: 'Failed to parse user data',
		unknownErrorMessage: 'Unknown error while fetching user'
	});
export type GitHubUserResult = Awaited<ReturnType<typeof fetchGitHubUser>>;

const PINNED_REPOS_QUERY = `
	query ($login: String!) {
		user(login: $login) {
			pinnedItems(first: 6, types: REPOSITORY) {
				nodes {
					... on Repository {
						nameWithOwner
					}
				}
			}
		}
	}
`;

/** resolves to the `owner/name` of the user's pinned repos, in profile order; the GraphQL API requires a token */
export const fetchGitHubPinnedRepos = (username: string, token: string) =>
	fetchJson(`${API_BASE_URL}/graphql`, {
		init: {
			method: 'POST',
			headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: PINNED_REPOS_QUERY,
				variables: { login: username.trim() }
			})
		},
		schema: GitHubPinnedReposResponseSchema,
		codes: ERROR_CODES,
		responseErrorMessage,
		parseErrorMessage: 'Failed to parse pinned repositories',
		unknownErrorMessage: 'Unknown error while fetching pinned repositories'
	});

const orderReposByPushedAt = (order: 'asc' | 'desc') => (a: GitHubRepo, b: GitHubRepo) =>
	order === 'desc'
		? b.pushed_at.getTime() - a.pushed_at.getTime()
		: a.pushed_at.getTime() - b.pushed_at.getTime();

const highlightRepos = (repos: GitHubRepo[], highlights: string[]) => {
	// create a lookup table where each highlighted repo's `owner/name` is mapped to its priority order
	// lower index = higher priority
	const index = new Map(highlights.map((h, i) => [h.toLowerCase(), i]));

	return [...repos].sort((a, b) => {
		// get the priority index of each repo, if it exists
		const ia = index.get(a.full_name.toLowerCase());
		const ib = index.get(b.full_name.toLowerCase());

		if (ia === undefined && ib === undefined) return 0; // if neither repo is highlighted, keep their relative order
		if (ia === undefined) return 1; // if only `b` is highlighted, move it before `a`
		if (ib === undefined) return -1; // if only `a` is highlighted, move it before `b`
		return ia - ib; // if both are highlighted, order them according to their position in the `highlights` array
	});
};

// 100 is the maximum page size, the default of 30 would silently drop repos
export const userReposUrl = (username: string) =>
	`${userUrl(username)}/repos?per_page=100` as const;

type Options = {
	showForks?: boolean;
	showArchived?: boolean;
	/** `owner/name` of the repos to move to the front, in order; they're shown even if forked or archived */
	highlights?: string[];
	ignore?: string[];
};

const trimNonEmpty = (values: string[]) => values.map((v) => v.trim()).filter((v) => v);

export const fetchGitHubUserRepos = (username: string, options: Options = {}) => {
	const { showForks = false, showArchived = false } = options;
	const highlights = trimNonEmpty(options.highlights ?? []);
	const highlighted = new Set(highlights.map((h) => h.toLowerCase()));
	const ignore = trimNonEmpty(options.ignore ?? []);

	return fetchJson(userReposUrl(username), {
		schema: GitHubRepoSchema.array(),
		codes: ERROR_CODES,
		responseErrorMessage,
		parseErrorMessage: 'Failed to parse user repositories',
		unknownErrorMessage: 'Unknown error while fetching user repositories'
	}).map((repos) => {
		const visible = repos
			.filter(
				(repo) =>
					highlighted.has(repo.full_name.toLowerCase()) ||
					((showForks || !repo.fork) && (showArchived || !repo.archived))
			)
			.filter((repo) => !ignore.includes(repo.name))
			.sort(orderReposByPushedAt('desc'));

		return highlights.length ? highlightRepos(visible, highlights) : visible;
	});
};
export type GitHubUserReposResult = Awaited<ReturnType<typeof fetchGitHubUserRepos>>;
