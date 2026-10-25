import { Ok, Err, catchUnwindAsync, type AsyncResult, type Result } from 'results-ts';
import type * as z from 'zod';

export const errorCodes = <const Prefix extends string>(prefix: Prefix) =>
	({
		FETCH: `${prefix}_FETCH_ERROR`,
		UNKNOWN: `${prefix}_UNKNOWN_ERROR`,
		PARSE: `${prefix}_PARSE_ERROR`
	}) as const;

type ErrorCodes = ReturnType<typeof errorCodes>;

export type FetchError<Codes extends ErrorCodes> =
	| { code: Codes['FETCH']; message: string; status: number }
	| { code: Codes['PARSE']; message: string; details: z.core.$ZodIssue[] }
	| { code: Codes['UNKNOWN']; message: string };

export const NO_CACHE_JSON_HEADERS = {
	'Content-Type': 'application/json',
	'Cache-Control': 'no-cache'
} as const;

type FetchJsonOptions<Schema extends z.ZodType, Codes extends ErrorCodes> = {
	init?: RequestInit;
	schema: Schema;
	codes: Codes;
	/** builds the error message for non-2xx responses; anything it throws becomes an `UNKNOWN` error */
	responseErrorMessage: (response: Response) => Promise<string> | string;
	parseErrorMessage: string;
	unknownErrorMessage: string;
};

export const fetchJson = <Schema extends z.ZodType, Codes extends ErrorCodes>(
	url: string,
	{
		init,
		schema,
		codes,
		responseErrorMessage,
		parseErrorMessage,
		unknownErrorMessage
	}: FetchJsonOptions<Schema, Codes>
): AsyncResult<z.output<Schema>, FetchError<Codes>> => {
	const request = async (): Promise<Result<z.output<Schema>, FetchError<Codes>>> => {
		const response = await fetch(url, init);

		if (!response.ok)
			return Err({
				code: codes.FETCH,
				message: await responseErrorMessage(response),
				status: response.status
			});

		const parseResult = schema.safeParse(await response.json());
		if (!parseResult.success)
			return Err({
				code: codes.PARSE,
				message: parseErrorMessage,
				details: parseResult.error.issues
			});

		return Ok(parseResult.data);
	};

	// `fetch` and `response.json()` reject on network and body errors
	const toUnknownError = (error: unknown): FetchError<Codes> => ({
		code: codes.UNKNOWN,
		message: error instanceof Error ? error.message : unknownErrorMessage
	});

	return catchUnwindAsync(request, toUnknownError)().flatten();
};
