<script lang="ts">
	import { MarkdownParser } from '@/components/markdown-parser';
	import { Icon } from '@/components/icon';

	let { data } = $props();
	const { content, title } = data;
</script>

<svelte:head>
	<title>{title} - blog</title>
</svelte:head>

<main class="p-6 md:p-9">
	<div class="mb-4">
		<a href="/blog" class="text-primary hover:text-accent transition-colors">
			<Icon name="arrow-left" color="var(--text)" />
			Back to posts
		</a>
	</div>

	<MarkdownParser input={content} />
</main>
