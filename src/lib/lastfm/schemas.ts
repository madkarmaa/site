import * as z from 'zod';

const LastFmImageSchema = z
	.object({
		'#text': z.string().trim(),
		size: z.enum(['small', 'medium', 'large', 'extralarge'])
	})
	.transform((image) => ({
		url: image['#text'],
		size: image.size
	}));

const LastFmArtistSchema = z
	.object({ '#text': z.string().trim() })
	.transform((artist) => artist['#text']);

const LastFmAlbumSchema = z
	.object({ '#text': z.string().trim() })
	.transform((album) => album['#text']);

const LastFmAttrSchema = z.object({
	nowplaying: z
		.string()
		.trim()
		.transform((v) => v === 'true')
		.optional()
});

export const LastFmTrackSchema = z
	.object({
		artist: LastFmArtistSchema,
		image: z.array(LastFmImageSchema),
		album: LastFmAlbumSchema,
		name: z.string().trim(),
		'@attr': LastFmAttrSchema.optional()
	})
	.transform((track) => ({
		artist: track.artist,
		images: track.image,
		album: track.album,
		name: track.name,
		now_playing: track['@attr']?.nowplaying ?? false
	}));
export type LastFmTrack = z.infer<typeof LastFmTrackSchema>;

export const LastFmRecentTracksSchema = z
	.object({
		recenttracks: z.object({
			track: z.union([LastFmTrackSchema, z.array(LastFmTrackSchema)])
		})
	})
	.transform(({ recenttracks }) => ({
		recent_tracks: Array.isArray(recenttracks.track) ? recenttracks.track : [recenttracks.track]
	}));
export type LastFmRecentTracks = z.infer<typeof LastFmRecentTracksSchema>;

export const LastFmErrorResponseSchema = z.object({
	error: z.number(),
	message: z.string().trim()
});
export type LastFmErrorResponse = z.infer<typeof LastFmErrorResponseSchema>;
