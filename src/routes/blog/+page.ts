import { repository } from './lib/configuration';
import { catchError, HTTPError, calculateReadTime } from '@/utils';
import { error as errorRedirect } from '@sveltejs/kit';

export type Post = {
	name: string;
	readTime: number;
};

export async function load({ fetch }) {
	const repo = repository.useFetchFn(fetch);

	const [error, files] = await catchError(repo.listDirectory('blog-posts'), [HTTPError]);

	if (error) errorRedirect(404, { message: 'No posts found' });

	const posts: Post[] = await Promise.all(
		files
			.filter((file) => file.download_url && file.name.endsWith('.md'))
			.map(async (file) => {
				const content = await repo.getRawFileContents(file.path);
				return {
					name: file.name,
					readTime: calculateReadTime(content)
				};
			})
	);

	if (!posts || !posts.length) errorRedirect(404, { message: 'No posts found' });

	return { posts };
}
