import { Ok, Err } from '@madkarma/result';
import { PUBLIC_LASTFM_API_KEY } from '$env/static/public';
import { LastFmRecentTracksSchema, LastFmErrorResponseSchema, type LastFmTrack } from './schemas';
import { API_BASE_URL, ERROR_CODES } from './constants';

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

export const userGetRecentTracks = async (username: string) => {
	try {
		const response = await fetch(userGetRecentTracksUrl(username), {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache'
			}
		});
		if (!response.ok) {
			const data = await response.json();
			const errorResponse = LastFmErrorResponseSchema.parse(data);
			return Err({
				code: ERROR_CODES.FETCH,
				message: errorResponse.message,
				status: response.status
			});
		}

		const data = await response.json();

		const recentTracksResult = LastFmRecentTracksSchema.safeParse(data);
		if (!recentTracksResult.success)
			return Err({
				code: ERROR_CODES.PARSE,
				message: 'Failed to parse recent tracks',
				details: recentTracksResult.error.issues
			});

		return Ok(recentTracksResult.data.recent_tracks);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Unknown error while fetching recent tracks';
		return Err({ code: ERROR_CODES.UNKNOWN, message });
	}
};

export const trackToYoutubeSearchUrl = (track: LastFmTrack) => {
	const query = new URLSearchParams({
		search_query: `${track.name} ${track.artist}`.trim()
	});
	return `https://www.youtube.com/results?${query.toString()}` as const;
};
