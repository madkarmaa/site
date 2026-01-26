<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { title: string; children: Snippet };
	let { title, children }: Props = $props();
</script>

<section class="relative flex flex-col gap-6">
	<h1
		class="text-center jetbrains-mono-100 text-6xl text-text-800 underline decoration-accent-700 decoration-2 underline-offset-8 md:text-8xl lg:text-[10rem]"
	>
		{title}
	</h1>
	<div>
		{@render children()}
	</div>
</section>
