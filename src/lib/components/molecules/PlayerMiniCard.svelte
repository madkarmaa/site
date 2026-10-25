<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import {
		userGetRecentTracks,
		trackToYoutubeSearchUrl,
		type LastFmError
	} from '#lib/lastfm/index.js';
	import { type LastFmTrack } from '#lib/lastfm/schemas.js';
	import MusicNote from '~icons/material-symbols/music-note-rounded';

	type Props = { username: string; updateMs?: number; liveUpdateMs?: number };
	let { username, updateMs = 60 * 1000, liveUpdateMs = 15 * 1000 }: Props = $props();

	let tracks = $state<LastFmTrack[]>();
	let error = $state<LastFmError>();
	let isInitialLoading = $state(true);

	const latestTrack = $derived(tracks?.[0]);
	const isPlaying = $derived(latestTrack?.now_playing ?? false);

	let refreshInterval: Interval | undefined;
	let currentRefreshMs: number | undefined;

	const startRefreshInterval = (intervalMs: number) => {
		clearInterval(refreshInterval);
		refreshInterval = setInterval(refreshRecentTracks, intervalMs);
		currentRefreshMs = intervalMs;
	};

	const refreshRecentTracks = async () => {
		await userGetRecentTracks(username).match({
			Ok: (nextTracks) => {
				tracks = nextTracks;
				error = undefined;
			},
			Err: (nextError) => (error = nextError)
		});
		isInitialLoading = false;

		const nextRefreshMs = isPlaying ? liveUpdateMs : updateMs;
		if (currentRefreshMs !== nextRefreshMs) startRefreshInterval(nextRefreshMs);
	};

	onMount(() => {
		startRefreshInterval(updateMs);
		refreshRecentTracks();
	});

	onDestroy(() => clearInterval(refreshInterval));
</script>

{#snippet trackData(name: string, artist: string = 'Unknown')}
	<div class="flex min-w-0 flex-col gap-2">
		<p class="text-md font-semibold wrap-break-word">{name.trim()}</p>
		<p class="text-sm wrap-break-word">
			by <span class="text-accent-800">{artist.trim()}</span>
		</p>
	</div>
{/snippet}

{#snippet cardContent()}
	<div
		class="flex aspect-square size-fit items-center justify-center rounded-full border-2 border-text-600 p-2 transition-transform"
		class:playing={isPlaying}
	>
		<MusicNote class="note size-10 text-text-800" />
	</div>

	{#if isInitialLoading}
		{@render trackData('Loading...', 'Loading...')}
	{:else if latestTrack}
		{@render trackData(latestTrack.name, latestTrack.artist)}
	{:else if error}
		{@render trackData(`Error: ${error.message}`)}
	{:else}
		{@render trackData('No recent tracks found.')}
	{/if}
{/snippet}

{#if latestTrack}
	<a
		class="flex w-max max-w-full items-center gap-4 rounded-md border-2 border-transparent p-4 transition-colors hover:border-accent-700"
		href={trackToYoutubeSearchUrl(latestTrack)}
		target="_blank"
		rel="noopener noreferrer external"
		aria-label={`Search ${latestTrack.name} by ${latestTrack.artist} on YouTube`}
		title={latestTrack.now_playing ? 'Currently playing :)' : 'Last played track'}
	>
		{@render cardContent()}
	</a>
{:else}
	<div
		class="flex w-max max-w-full items-center gap-4 rounded-md border-2 border-transparent p-4 transition-colors"
	>
		{@render cardContent()}
	</div>
{/if}

<style>
	.playing {
		animation: rotate 3s infinite linear;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
