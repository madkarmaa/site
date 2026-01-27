import * as z from 'zod';

export const GitHubUserSchema = z.object({
	id: z.number(),
	login: z.string().trim(),
	avatar_url: z.url().trim(),
	html_url: z.url().trim(),
	name: z.string().trim().nullable(),
	company: z.string().trim().nullable(),
	public_repos: z.number(),
	followers: z.number(),
	following: z.number()
});
export type GitHubUser = z.infer<typeof GitHubUserSchema>;

export const GitHubRepoSchema = z
	.object({
		id: z.number(),
		name: z.string().trim(),
		full_name: z.string().trim(),
		html_url: z.url().trim(),
		description: z.string().trim().nullable(),
		stargazers_count: z.number(),
		forks_count: z.number(),
		fork: z.boolean(),
		archived: z.boolean(),
		pushed_at: z
			.string()
			.trim()
			.transform((dateString) => new Date(dateString)),
		topics: z.string().trim().array()
	})
	.transform((repo) => ({
		...repo,
		picture_url: `https://opengraph.githubassets.com/1/${repo.full_name}`
	}));
export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

export const GitHubErrorResponseSchema = z.object({
	message: z.string().trim()
});
export type GitHubErrorResponse = z.infer<typeof GitHubErrorResponseSchema>;

export const ContributionsSchema = z.object({
	total: z.object({
		lastYear: z.number()
	}),
	contributions: z
		.object({
			date: z
				.string()
				.trim()
				.transform((dateString) => new Date(dateString)),
			count: z.number(),
			level: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
		})
		.array()
});
export type Contributions = z.infer<typeof ContributionsSchema>;

export const ContributionsErrorResponseSchema = z.object({
	error: z.string().trim()
});
export type ContributionsErrorResponse = z.infer<typeof ContributionsErrorResponseSchema>;
