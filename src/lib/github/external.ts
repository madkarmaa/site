import { ok, err } from '@madkarma/ts-utils/result';
import { ContributionsSchema, ContributionsErrorResponseSchema } from './schemas';

const API_BASE_URL = 'https://github-contributions-api.jogruber.de/v4' as const;

export const userUrl = (username: string) => `${API_BASE_URL}/${username.trim()}?y=last` as const;
export const fetchUserContributions = async (username: string) => {
	try {
		const response = await fetch(userUrl(username));
		if (!response.ok) {
			const data = await response.json();
			const errorResponse = ContributionsErrorResponseSchema.parse(data);
			return err({
				code: 'CONTRIBUTIONS_FETCH_ERROR' as const,
				message: errorResponse.error,
				status: response.status
			});
		}

		const data = await response.json();

		const contributions = ContributionsSchema.safeParse(data);
		if (!contributions.success) {
			return err({
				code: 'CONTRIBUTIONS_PARSE_ERROR' as const,
				message: 'Failed to parse contributions data'
			});
		}

		return ok(contributions.data);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Unknown error while fetching contributions';
		return err({ code: 'CONTRIBUTIONS_UNKNOWN_ERROR', message });
	}
};
export type UserContributionsResult = Awaited<ReturnType<typeof fetchUserContributions>>;
