import 'unplugin-icons/types/svelte';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type OmitFix<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
	type MaybePromise<T> = T | Promise<T>;

	type Interval = ReturnType<typeof setInterval>;
	type Timeout = ReturnType<typeof setTimeout>;
}

export {};
