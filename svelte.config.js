import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		alias: {
			'@/*': './src/lib/*',
			'@assets/*': './static/*'
		},
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore 404 errors for GitHub repository links
				if (path.startsWith('/blob/') || path.includes('github.com')) return;

				// otherwise fail the build
				throw new Error(message);
			}
		}
	}
};

export default config;
