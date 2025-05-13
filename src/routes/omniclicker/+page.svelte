<script lang="ts">
	import { randomlyTrue } from '@/utils';

	const INCREMENT_STEP = 0.001;

	let scale = $state(1);
	let verticalShift = $state(0);
	let audio: HTMLAudioElement;

	$effect(() => {
		audio = new Audio('/omniman/i_am_omning_it.mp3');
		audio.preload = 'auto';
	});

	const incrementCount = (event: Event) => {
		if (!(event instanceof MouseEvent) && !(event instanceof KeyboardEvent && event.key === ' '))
			return;

		scale += INCREMENT_STEP;
		verticalShift -= INCREMENT_STEP * 20;

		if (randomlyTrue(5)) {
			audio.currentTime = 0;
			audio.play();
		}
	};
</script>

<svelte:window onkeypress={incrementCount} onclick={incrementCount} />

<div class="container">
	<img src="/omniman/full.png" alt="OmniMan" />
	<img
		src="/omniman/cheeks.png"
		alt="OmniMan Cheeks"
		class="cheeks"
		style="transform: translate(-50%, calc(-50% + {verticalShift}%)) scale({scale});"
	/>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		min-height: 100vh;
		overflow: hidden;
	}

	img {
		max-height: 100vh;
		max-width: 100vw;
		width: auto;
	}

	.cheeks {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 10;
	}
</style>
