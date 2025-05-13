<script lang="ts">
	import { inview, type Options } from 'svelte-inview';
	import { getContext, type Snippet } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { type TextSide } from '.';

	const textSide: TextSide = getContext<() => TextSide>('textSide')();

	type Props = { title?: string; image?: string; children: Snippet };
	let { title, image, children }: Props = $props();

	const inviewOptions: Options = {
		unobserveOnEnter: true
	};

	let isInView: boolean = $state(false);

	const handleInView = () => {
		isInView = true;
	};
</script>

<div class="inview-detector" use:inview={inviewOptions} oninview_enter={handleInView}>
	{#if isInView}
		<div
			class="section-item {textSide} flex gap-8"
			in:fly={{ y: 100, duration: 750, easing: cubicOut }}
		>
			{#if image}
				<div class="image-container justify-center max-w-full">
					<img src={image} alt={title || 'Section image'} loading="lazy" />
				</div>
			{/if}

			<div class="section-content">
				{#if title}
					<h2>{title}</h2>
				{/if}
				<div class="content">
					{@render children()}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.section-content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 1rem;
	}

	.section-item > div {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.image-container > :global(img) {
		@apply rounded-lg;
	}

	.image-container > :global(:not(img)),
	.image-container > :global(img):not(:first-child) {
		display: none;
	}

	.left {
		flex-direction: row-reverse;
	}

	.left .content {
		text-align: start;
	}

	.right {
		flex-direction: row;
	}

	.right .content {
		text-align: end;
	}

	@media (max-width: 768px) {
		.section-item {
			flex-direction: column;
		}

		.section-item > div {
			flex: unset;
		}

		.left > .section-content,
		.right > .section-content {
			text-align: center;
		}
	}
</style>
