import { Ok, Err } from '@madkarma/result';
import { PUBLIC_COUNTER_API_URL } from '$env/static/public';
import { CounterResponseSchema } from './schemas';
import { ERROR_CODES } from './constants';

export const getCount = async () => {
	try {
		const response = await fetch(PUBLIC_COUNTER_API_URL, {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache'
			}
		});

		if (!response.ok)
			return Err({
				code: ERROR_CODES.FETCH,
				message: `Failed to fetch counter: ${response.statusText}`,
				status: response.status
			});

		const data = await response.json();

		const parseResult = CounterResponseSchema.safeParse(data);
		if (!parseResult.success)
			return Err({
				code: ERROR_CODES.PARSE,
				message: 'Failed to parse counter response',
				details: parseResult.error.issues
			});

		return Ok(parseResult.data.count);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error while fetching counter';

		return Err({
			code: ERROR_CODES.UNKNOWN,
			message
		});
	}
};

export const incrementCount = async () => {
	try {
		const response = await fetch(PUBLIC_COUNTER_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache'
			}
		});

		if (!response.ok)
			return Err({
				code: ERROR_CODES.FETCH,
				message: `Failed to increment counter: ${response.statusText}`,
				status: response.status
			});

		const data = await response.json();

		const parseResult = CounterResponseSchema.safeParse(data);
		if (!parseResult.success)
			return Err({
				code: ERROR_CODES.PARSE,
				message: 'Failed to parse increment counter response',
				details: parseResult.error.issues
			});

		return Ok(parseResult.data.count);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Unknown error while incrementing counter';

		return Err({
			code: ERROR_CODES.UNKNOWN,
			message
		});
	}
};
