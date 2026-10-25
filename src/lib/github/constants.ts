import { errorCodes } from '#lib/utils/fetch.js';

export const API_BASE_URL = 'https://api.github.com' as const;

export const ERROR_CODES = errorCodes('GITHUB');
