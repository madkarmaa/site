export const API_BASE_URL = 'https://api.github.com' as const;

const PREFIX = 'GITHUB_' as const;
export const ERROR_CODES = {
	FETCH: 'FETCH_ERROR'.withPrefix(PREFIX),
	UNKNOWN: 'UNKNOWN_ERROR'.withPrefix(PREFIX),
	PARSE: 'PARSE_ERROR'.withPrefix(PREFIX)
} as const;
