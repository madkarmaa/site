<script lang="ts">
	import type { Snippet } from 'svelte';
	// import GitHub from '~icons/mdi/github';

	type Props = { title: Snippet; description: Snippet };
	let { title, description }: Props = $props();
</script>

<div class="flex flex-col gap-6">
	<h1 class="jetbrains-mono-700 text-3xl">{@render title()}</h1>
	<div class="text-lg">{@render description()}</div>
</div>
