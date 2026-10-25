import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_GITHUB_USERNAME: { public: true, static: true },
	PUBLIC_LASTFM_USERNAME: { public: true, static: true },
	PUBLIC_LASTFM_API_KEY: { public: true, static: true },
	PUBLIC_COUNTER_API_URL: { public: true, static: true },
	GITHUB_TOKEN: {
		static: true,
		description:
			'Used at build time to read the pinned repos; without it, no repos are highlighted',
		schema: (value) => value || undefined
	}
});
