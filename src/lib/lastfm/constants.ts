export const API_BASE_URL = 'https://ws.audioscrobbler.com/2.0' as const;

const PREFIX = 'LASTFM_' as const;
export const ERROR_CODES = {
	FETCH: `${PREFIX}FETCH_ERROR`,
	UNKNOWN: `${PREFIX}UNKNOWN_ERROR`,
	PARSE: `${PREFIX}PARSE_ERROR`
} as const;
