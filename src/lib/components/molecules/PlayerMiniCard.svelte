<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { userGetRecentTracks, trackToYoutubeSearchUrl } from '$lib/lastfm';
	import MusicNote from '~icons/material-symbols/music-note-rounded';

	type Props = { username: string; updateMs?: number; liveUpdateMs?: number };
	let { username, updateMs = 60 * 1000, liveUpdateMs = 15 * 1000 }: Props = $props();

	type RecentTracksResult = Awaited<ReturnType<typeof userGetRecentTracks>>;

	let tracks: RecentTracksResult[0] | undefined = $state(undefined);
	let error: RecentTracksResult[1] | undefined = $state(undefined);
	let isInitialLoading = $state(true);
	let refreshInterval: Interval | undefined = $state(undefined);
	let currentRefreshMs: number | undefined = $state(undefined);

	const getRefreshMs = () =>
		tracks && tracks.length && tracks[0].now_playing ? liveUpdateMs : updateMs;

	const startRefreshInterval = (intervalMs: number) => {
		if (refreshInterval !== undefined) clearInterval(refreshInterval);
		refreshInterval = setInterval(refreshRecentTracks, intervalMs);
		currentRefreshMs = intervalMs;
	};

	const refreshRecentTracks = async () => {
		const [nextTracks, nextError] = await userGetRecentTracks(username);

		if (!nextError) tracks = nextTracks;
		error = nextError;
		isInitialLoading = false;

		const nextRefreshMs = getRefreshMs();
		if (currentRefreshMs !== nextRefreshMs) startRefreshInterval(nextRefreshMs);
	};

	onMount(() => {
		const nextRefreshMs = getRefreshMs();
		startRefreshInterval(nextRefreshMs);
		refreshRecentTracks();
	});

	onDestroy(() => {
		if (refreshInterval !== undefined) clearInterval(refreshInterval);

		tracks = undefined;
		error = undefined;
		isInitialLoading = true;
		currentRefreshMs = undefined;
	});
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
		class:playing={tracks && tracks.length && tracks[0].now_playing}
	>
		<MusicNote class="note size-10 text-text-800" />
	</div>

	{#if isInitialLoading}
		{@render trackData('Loading...')}
	{:else if tracks && tracks.length}
		{@render trackData(tracks[0].name, tracks[0].artist)}
	{:else if error}
		{@render trackData(`Error: ${error.message}`)}
	{:else}
		{@render trackData('No recent tracks found.')}
	{/if}
{/snippet}

{#if tracks && tracks.length}
	<a
		class="flex w-max max-w-full items-center gap-4 rounded-md border-2 border-transparent p-4 transition-colors hover:border-accent-700"
		href={trackToYoutubeSearchUrl(tracks[0])}
		target="_blank"
		rel="noopener noreferrer external"
		aria-label={`Search ${tracks[0].name} by ${tracks[0].artist} on YouTube`}
		title={tracks[0].now_playing ? 'Currently playing :)' : 'Last played track'}
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
