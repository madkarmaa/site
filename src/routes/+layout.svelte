<script lang="ts">
	import { type Snippet } from 'svelte';

	import { car } from '@/stores';
	import Neko from '@/components/Neko.svelte';
	import Blob from '@/components/Blob.svelte';
	import { page } from '$app/state';

	// set this to true to enable debug outlines on all elements
	const debug = false;

	type Props = { children: Snippet };
	let { children }: Props = $props();

	const BLOB_DISABLED = ['/omniclicker'];

	$effect(() => {
		Object.defineProperty(window, 'OMG_CARRRRRR', {
			get: () => {
				car.set(!$car);
				if ($car) console.log('%cmeow meow 😼', 'font-size: 3rem; color: #f0f;');
			}
		});
	});
</script>

{#if $car}
	<Neko />
{/if}

{#if !BLOB_DISABLED.includes(page.url.pathname)}
	<Blob />
{/if}

{@render children()}

{#if debug}
	<style global>
		* {
			outline: 1px solid #f002 !important;
			outline-offset: -1px;
		}
	</style>
{/if}
