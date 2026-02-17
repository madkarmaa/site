export const API_BASE_URL = 'https://api.github.com' as const;

const PREFIX = 'GITHUB_' as const;
export const ERROR_CODES = {
	FETCH: `${PREFIX}FETCH_ERROR`,
	UNKNOWN: `${PREFIX}UNKNOWN_ERROR`,
	PARSE: `${PREFIX}PARSE_ERROR`
} as const;
