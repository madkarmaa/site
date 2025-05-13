<script lang="ts">
	import PostCard from './lib/PostCard.svelte';

	let { data } = $props();
	const { posts } = data;
</script>

<main class="p-6">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each posts as post, i (post.name)}
			<PostCard name={post.name} readTime={post.readTime} index={i} />
		{/each}
	</div>
</main>
