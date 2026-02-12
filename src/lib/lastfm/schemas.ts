import * as z from 'zod';

const LastFmImageSchema = z.object({
	'#text': z.url().trim(),
	size: z.enum(['small', 'medium', 'large', 'extralarge'])
});
const LastFmArtistSchema = z.object({ '#text': z.string().trim() });
const LastFmAlbumSchema = z.object({ '#text': z.string().trim() });

const LastFmAttrSchema = z.object({
	nowplaying: z
		.string()
		.trim()
		.transform((v) => v === 'true')
		.optional()
});

const LastFmTrackSchema = z.object({
	artist: LastFmArtistSchema,
	image: z.array(LastFmImageSchema),
	album: LastFmAlbumSchema,
	name: z.string().trim(),
	'@attr': LastFmAttrSchema.optional()
});

export const LastFmRecentTracksSchema = z.object({
	recenttracks: z.object({
		track: z.union([LastFmTrackSchema, z.array(LastFmTrackSchema)])
	})
});
export type LastFmRecentTracks = z.infer<typeof LastFmRecentTracksSchema>;

export const LastFmErrorResponseSchema = z.object({
	error: z.number(),
	message: z.string().trim()
});
export type LastFmErrorResponse = z.infer<typeof LastFmErrorResponseSchema>;
