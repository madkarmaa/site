import { ok, err } from '@madkarma/ts-utils/result';
import { PUBLIC_LASTFM_API_KEY } from '$env/static/public';
import { LastFmRecentTracksSchema, LastFmErrorResponseSchema } from './schemas';

const API_BASE_URL = 'https://ws.audioscrobbler.com/2.0' as const;

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
		const response = await fetch(userGetRecentTracksUrl(username));
		if (!response.ok) {
			const data = await response.json();
			const errorResponse = LastFmErrorResponseSchema.parse(data);
			return err({
				code: 'LASTFM_RECENT_TRACKS_FETCH_ERROR' as const,
				message: errorResponse.message,
				status: response.status
			});
		}

		const data = await response.json();

		const recentTracks = LastFmRecentTracksSchema.safeParse(data);
		if (!recentTracks.success) {
			console.error(recentTracks.error);
			return err({
				code: 'LASTFM_RECENT_TRACKS_PARSE_ERROR' as const,
				message: 'Failed to parse recent tracks',
				details: recentTracks.error.issues
			});
		}

		return ok(recentTracks.data.recenttracks.track);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Unknown error while fetching recent tracks';
		return err({ code: 'LASTFM_UNKNOWN_ERROR', message });
	}
};
