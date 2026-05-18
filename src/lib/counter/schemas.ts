import * as z from 'zod';

export const CounterResponseSchema = z.object({
	count: z.number()
});
