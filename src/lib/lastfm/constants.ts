export const API_BASE_URL = 'https://ws.audioscrobbler.com/2.0' as const;

const PREFIX = 'LASTFM_' as const;
export const ERROR_CODES = {
	FETCH: 'FETCH_ERROR'.withPrefix(PREFIX),
	UNKNOWN: 'UNKNOWN_ERROR'.withPrefix(PREFIX),
	PARSE: 'PARSE_ERROR'.withPrefix(PREFIX)
} as const;
