<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import type { Post } from '../+page';
	import { fly } from 'svelte/transition';

	type Props = Post & { index?: number };
	let { name, readTime, index = 0 }: Props = $props();

	const postSlug = name.trim().replace('.md', '');

	let visible: boolean = $state(false);

	$effect(() => {
		setTimeout(() => {
			visible = true;
		}, 1); // 1ms delay to allow for transition to work
	});
</script>

{#if visible}
	<a
		class="post-card-container flex flex-col gap-3 rounded-lg p-4 backdrop-blur-2xl border-secondary border-2 backdrop-brightness-75 hover:border-primary transition-all"
		href={`/blog/${postSlug}`}
		in:fly={{ y: 20, duration: 400, delay: index * 100, easing: cubicOut }}
	>
		<h2 class="post-name">
			<span class="slash transition-all inline-block text-primary">/</span>
			<span class="font-semibold">{postSlug}</span>
		</h2>
		<span class="read-time">~<span class="text-primary">{readTime} min</span> read</span>
	</a>
{/if}

<style>
	.post-name > * {
		font-size: 1.3rem;
	}

	.post-card-container:hover .slash {
		transform: rotate(180deg);
		color: var(--accent);
	}

	.read-time,
	.read-time * {
		@apply text-sm;
	}
</style>
