import logger from '@/logger';
import { repository } from '../lib/configuration';
import { catchError, HTTPError } from '@/utils';
import { error as errorRedirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const repo = repository.useFetchFn(fetch);
	const postId = params.id;

	if (!postId) errorRedirect(404, { message: 'Post not found' });

	const [error, content] = await catchError(repo.getRawFileContents(`blog-posts/${postId}.md`), [
		HTTPError
	]);

	if (error) errorRedirect(404, { message: 'Post not found' });

	return { content, title: postId };
}

// prerender all possible blog posts
export async function entries() {
	try {
		const files = await repository.listDirectory('blog-posts');

		return files
			.filter((file) => file.name.endsWith('.md'))
			.map((file) => ({
				id: file.name.replace('.md', '')
			}));
	} catch (error) {
		logger.error('failed to fetch blog entries for static generation:', error);
		return [];
	}
}
