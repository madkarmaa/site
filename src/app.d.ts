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
}

export {};
