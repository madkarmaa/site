<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export type Props = {
		label: string;
		icon: typeof import('~icons/*').default;
		showDelay?: number;
	};
	let { label, icon: Icon, showDelay = 0 }: Props = $props();

	let show = $state(false);
	onMount(() => setTimeout(() => (show = true), showDelay));
</script>

{#if show}
	<div
		class="group flex flex-col items-center justify-center gap-4 rounded-md border-2 border-background-100 bg-background-100 p-6 transition-colors hover:border-accent-700"
		transition:fly={{ y: 20, duration: 200 }}
	>
		<Icon class="size-18 text-secondary-900 transition-transform group-hover:scale-105" />
		<p class="text-center jetbrains-mono-600 text-xl text-text-700">{label}</p>
	</div>
{/if}
