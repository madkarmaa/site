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
		class="flex flex-col items-center justify-center gap-4 rounded-md bg-background-100 p-4"
		transition:fly={{ y: 20, duration: 200 }}
	>
		<Icon class="h-20 w-20 text-secondary-900" />
		<p class="jetbrains-mono-600 text-xl text-text-700">{label}</p>
	</div>
{/if}
