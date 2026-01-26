<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { title: string; icon: typeof import('~icons/*').default; children: Snippet };
	let { title, icon: Icon, children }: Props = $props();
</script>

<section class="relative flex flex-col gap-6">
	<h1 class="flex items-center gap-4 text-2xl">
		<Icon class="inline-block text-accent-800" />
		{title}
	</h1>
	<div>
		{@render children()}
	</div>
</section>
