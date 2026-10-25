import { errorCodes } from '#lib/utils/fetch.js';

export const API_BASE_URL = 'https://ws.audioscrobbler.com/2.0' as const;

export const ERROR_CODES = errorCodes('LASTFM');
