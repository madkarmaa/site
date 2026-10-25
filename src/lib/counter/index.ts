import { PUBLIC_COUNTER_API_URL } from '$app/env/public';
import { fetchJson, NO_CACHE_JSON_HEADERS } from '#lib/utils/fetch.js';
import { CounterResponseSchema } from './schemas';
import { ERROR_CODES } from './constants';

export const getCount = () =>
	fetchJson(PUBLIC_COUNTER_API_URL, {
		init: { headers: NO_CACHE_JSON_HEADERS },
		schema: CounterResponseSchema,
		codes: ERROR_CODES,
		responseErrorMessage: (response) => `Failed to fetch counter: ${response.statusText}`,
		parseErrorMessage: 'Failed to parse counter response',
		unknownErrorMessage: 'Unknown error while fetching counter'
	}).map(({ count }) => count);

export const incrementCount = () =>
	fetchJson(PUBLIC_COUNTER_API_URL, {
		init: { method: 'POST', headers: NO_CACHE_JSON_HEADERS },
		schema: CounterResponseSchema,
		codes: ERROR_CODES,
		responseErrorMessage: (response) => `Failed to increment counter: ${response.statusText}`,
		parseErrorMessage: 'Failed to parse increment counter response',
		unknownErrorMessage: 'Unknown error while incrementing counter'
	}).map(({ count }) => count);
