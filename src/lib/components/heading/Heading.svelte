<script lang="ts">
	import { randomlyTrue, isMobileDevice } from '@/utils';
	import { type Snippet } from 'svelte';

	type Props = { text: string; links?: Snippet; shuffleProbability?: number };
	let { text, links, shuffleProbability = 2 }: Props = $props();

	const getRandomChar = () => String.fromCharCode(65 + Math.floor(Math.random() * 57));
	const hoveringElements = new Set<HTMLElement>();

	const onHover = (originalChar: string, element: HTMLElement) => {
		if (!randomlyTrue(shuffleProbability) || hoveringElements.has(element)) return;
		hoveringElements.add(element);

		const intervalId = setInterval(() => {
			element.textContent = getRandomChar();
		}, 30);

		setTimeout(() => {
			clearInterval(intervalId);
			element.textContent = originalChar;
		}, 750);
	};

	const onMouseLeave = (element: HTMLElement) => {
		hoveringElements.delete(element);
	};
</script>

<div id="heading-container" class="flex items-center justify-center flex-col min-h-screen">
	<h1 id="heading" class="noselect mix-blend-color-dodge">
		{#each text.trim() as letter, i (i)}
			{#if isMobileDevice()}
				<span>{letter}</span>
			{:else}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<span
					onmouseenter={(e) => onHover(letter, e.currentTarget)}
					onmouseleave={(e) => onMouseLeave(e.currentTarget)}
				>
					{letter}
				</span>
			{/if}
		{/each}
	</h1>

	{#if links}
		<div class="links flex flex-wrap items-center justify-center gap-x-8 gap-y-2 max-w-[70%]">
			{@render links()}
		</div>
	{/if}
</div>

<style>
	#heading > span {
		font-size: 12vw;
	}
</style>
