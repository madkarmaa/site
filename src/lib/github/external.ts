import { ContributionsSchema, ContributionsErrorResponseSchema } from './schemas';

const API_BASE_URL = 'https://github-contributions-api.jogruber.de/v4' as const;

const logApiError = async (response: Response, message?: string) => {
	message = message?.trim() ?? 'Contributions API Error';

	const data = await response.json();
	const error = ContributionsErrorResponseSchema.parse(data);

	console.error(`[${response.status}] ${message}:\n\n${error.error}`);

	return { message: error.error, status: response.status } as const;
};

export const userUrl = (username: string) => `${API_BASE_URL}/${username.trim()}?y=last` as const;
export const fetchUserContributions = async (username: string) => {
	const response = await fetch(userUrl(username));
	if (!response.ok) {
		const error = await logApiError(response, 'Error fetching user contributions');
		return [null, error] as const;
	}

	const data = await response.json();
	const contributions = ContributionsSchema.parse(data);
	return [contributions, null] as const;
};
export type UserContributionsResult = Awaited<ReturnType<typeof fetchUserContributions>>;
