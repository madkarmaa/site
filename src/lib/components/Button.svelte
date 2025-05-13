<script lang="ts">
	import type { ClassValue, HTMLButtonAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';

	type Props = {
		text: string;
		textOnClick?: string;
		class?: ClassValue;
	} & HTMLButtonAttributes; // https://github.com/sveltejs/svelte/issues/12539#issuecomment-2243225694

	// define the correct event type for button click handlers
	type ButtonClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

	// https://www.reddit.com/r/sveltejs/comments/1dodc08/comment/la8za5c
	let {
		text,
		textOnClick,
		class: className = '',
		onclick: userOnClick,
		...restProps
	}: Props = $props();

	let clicked: boolean = $state(false);

	function handleClick(event: ButtonClickEvent) {
		if (userOnClick) userOnClick(event);

		if (!textOnClick) return;
		clicked = true;

		setTimeout(() => {
			clicked = false;
		}, 500);
	}
</script>

<button
	class="p-3 cursor-pointer rounded-lg transition-all bg-secondary hover:bg-accent {className}"
	{...restProps}
	onclick={handleClick}
>
	{#key clicked}
		<span in:fade={{ duration: 150 }}>
			{clicked && textOnClick ? textOnClick : text}
		</span>
	{/key}
</button>
