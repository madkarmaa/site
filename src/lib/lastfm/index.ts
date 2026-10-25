import { PUBLIC_LASTFM_API_KEY } from '$app/env/public';
import { fetchJson, NO_CACHE_JSON_HEADERS, type FetchError } from '#lib/utils/fetch.js';
import { LastFmRecentTracksSchema, LastFmErrorResponseSchema, type LastFmTrack } from './schemas';
import { API_BASE_URL, ERROR_CODES } from './constants';

export type LastFmError = FetchError<typeof ERROR_CODES>;

const FORBIDDEN_PARAMS = ['method', 'api_key'] as const;
type Forbidden = (typeof FORBIDDEN_PARAMS)[number];

const methodUrl = <Params extends Record<string, string> & { [K in Forbidden]?: never }>(
	method: string,
	params: Params
) => {
	const sanitizedParams = Object.fromEntries(
		Object.entries(params)
			.map(([key, value]) => [key, value.trim()])
			.filter(([key, value]) => value && !FORBIDDEN_PARAMS.includes(key as Forbidden))
	);

	const query = new URLSearchParams({
		method: method.trim().toLowerCase(),
		api_key: PUBLIC_LASTFM_API_KEY,
		...sanitizedParams
	});

	return `${API_BASE_URL}/?${query.toString()}&format=json` as const;
};

export const userGetRecentTracksUrl = (username: string) =>
	methodUrl('user.getrecenttracks', { user: username.trim() });

export const userGetRecentTracks = (username: string) =>
	fetchJson(userGetRecentTracksUrl(username), {
		init: { headers: NO_CACHE_JSON_HEADERS },
		schema: LastFmRecentTracksSchema,
		codes: ERROR_CODES,
		responseErrorMessage: async (response) =>
			LastFmErrorResponseSchema.parse(await response.json()).message,
		parseErrorMessage: 'Failed to parse recent tracks',
		unknownErrorMessage: 'Unknown error while fetching recent tracks'
	}).map(({ recent_tracks }) => recent_tracks);

export const trackToYoutubeSearchUrl = (track: LastFmTrack) => {
	const query = new URLSearchParams({
		search_query: `${track.name} ${track.artist}`.trim()
	});
	return `https://www.youtube.com/results?${query.toString()}` as const;
};
