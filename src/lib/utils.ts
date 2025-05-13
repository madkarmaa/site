import { browser } from '$app/environment';

export const secToMs = (sec: number): number => sec * 1000;

export const minToMs = (min: number): number => secToMs(min * 60);

export const base64 = {
	encode: (input: string): string => btoa(input),
	decode: (input: string): string => atob(input)
};

export const randomlyTrue = (probability: number = 50): boolean => {
	if (probability < 0 || probability > 100)
		throw new TypeError('probability must be between 0 and 100');
	return Math.random() * 100 <= probability;
};

export const isMobileDevice = (): boolean => {
	// idk if this is the best way of handling the window object not being present but it works
	if (!browser) return false;

	const isHoverSupported = window.matchMedia('(hover: hover)').matches;
	const isTouchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

	// if the device does not support hover but supports touch, it's likely a mobile device
	return !isHoverSupported && isTouchSupported;
};

/**
 * https://www.youtube.com/watch?v=AdmGHwvgaVs
 */
export const catchError = async <T, E extends new (...args: any[]) => Error>(
	promise: Promise<T>,
	errorsToCatch?: E[]
): Promise<[undefined, T] | [InstanceType<E>]> => {
	try {
		const data = await promise;
		return [undefined, data] as [undefined, T];
	} catch (error) {
		if (!errorsToCatch || errorsToCatch.some((e) => error instanceof e))
			return [error as InstanceType<E>];
		throw error;
	}
};

export class HTTPError extends Error {
	public readonly statusCode: number;
	public readonly statusText: string;

	public constructor(response: Response) {
		super(`${response.status}: ${response.statusText}`);

		this.statusCode = response.status;
		this.statusText = response.statusText;
	}

	public toString(): string {
		return `${this.name} - ${this.statusCode}: ${this.statusText}`;
	}
}

export const calculateReadTime = (text: string, wordsPerMinute: number = 200): number =>
	Math.ceil(text.split(' ').length / wordsPerMinute);

export const range = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;
