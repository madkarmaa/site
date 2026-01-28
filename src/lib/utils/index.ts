import { browser } from '$app/environment';

export const prefetchImages = (...urls: string[]) => {
	if (!browser) return;

	urls
		.map((url) => url.trim())
		.filter((url) => url && !url.startsWith('data:'))
		.forEach((url) => {
			const img = new Image();
			img.src = url;
		});
};
