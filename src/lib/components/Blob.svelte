<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { isMobileDevice, secToMs } from '@/utils';
	import { car } from '@/stores';

	type Props = { followSpeed?: number };
	type Position = { x: number; y: number };

	let { followSpeed = 25 }: Props = $props();
	followSpeed = followSpeed / 1000;

	let blobPosition: Position = $state({ x: 0, y: 0 });
	let mousePosition: Position = $state({ x: 0, y: 0 });
	let animationFrame: number = $state(0);
	let show: boolean = $state(false);

	const updateBlobPosition = () => {
		// calculate new position
		blobPosition.x += (mousePosition.x - blobPosition.x) * followSpeed;
		blobPosition.y += (mousePosition.y - blobPosition.y) * followSpeed;

		// get document dimensions
		const docWidth = document.documentElement.scrollWidth;
		const docHeight = document.documentElement.scrollHeight;

		// clamp to document boundaries
		const blobRadius = 150; // half of blob size
		blobPosition.x = Math.max(blobRadius, Math.min(blobPosition.x, docWidth - blobRadius));
		blobPosition.y = Math.max(blobRadius, Math.min(blobPosition.y, docHeight - blobRadius));

		animationFrame = requestAnimationFrame(updateBlobPosition);
	};

	const handleMouseMove = (e: MouseEvent) => {
		mousePosition = { x: e.clientX, y: e.clientY };
	};

	$effect(() => {
		window.addEventListener('mousemove', handleMouseMove);
		animationFrame = requestAnimationFrame(updateBlobPosition);

		show = true;

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			cancelAnimationFrame(animationFrame);
		};
	});
</script>

{#if show && !$car && !isMobileDevice()}
	<div
		class="blob fixed w-[300px] aspect-1 rounded-full pointer-events-none opacity-40 -z-[1] blur-[20px]"
		style="transform: translate(calc({blobPosition.x}px - 50%), calc({blobPosition.y}px - 50%));"
		in:fade={{ duration: 500, delay: secToMs(1) }}
		out:fade={{ duration: 500 }}
	></div>
{/if}

<style>
	.blob {
		transform: translate(-50%, -50%);
		animation: morph 3s infinite ease-in-out;
		background: linear-gradient(20deg, var(--primary) 0%, var(--accent) 50%, var(--secondary) 100%);
	}

	@keyframes morph {
		0%,
		100% {
			border-radius: 50% 65% 70% 55% / 55% 70% 60% 50%;
		}
		25% {
			border-radius: 70% 50% 60% 65% / 60% 50% 65% 75%;
		}
		50% {
			border-radius: 60% 70% 50% 60% / 65% 55% 70% 60%;
		}
		75% {
			border-radius: 55% 60% 70% 50% / 50% 75% 60% 65%;
		}
	}
</style>
