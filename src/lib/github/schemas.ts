import * as z from 'zod';

export const GitHubUserSchema = z.object({
	login: z.string().trim(),
	id: z.number(),
	avatar_url: z.url().trim(),
	html_url: z.url().trim(),
	name: z.string().trim().nullable(),
	public_repos: z.number(),
	followers: z.number(),
	following: z.number()
});
export type GitHubUser = z.infer<typeof GitHubUserSchema>;

export const GitHubRepoSchema = z.object({
	name: z.string().trim(),
	full_name: z.string().trim(),
	html_url: z.url().trim(),
	description: z.string().trim().nullable(),
	stargazers_count: z.number(),
	forks_count: z.number(),
	archived: z.boolean(),
	topics: z.string().trim().array()
});
export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

export const ErrorResponseSchema = z.object({
	message: z.string().trim()
});
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
