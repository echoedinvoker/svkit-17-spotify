<script lang="ts" context="module">
	let current: HTMLAudioElement;
</script>

<script lang="ts">
	import { Play, Pause } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	type track = SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;

	// export let track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
	export let track: track;
	let audio: HTMLAudioElement;
	let paused = true;

	const dispatch = createEventDispatcher<{
		// play: { track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified };
		// pause: { track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified };
		play: { track: track };
		pause: { track: track };
	}>();

	function onPlay() {
		if (current && current !== audio) {
			current.pause();
		}
		current = audio;
		dispatch('play', { track });
	}

	function onPause() {
		dispatch('pause', { track });
	}
</script>

<div class="player">
	<audio
		on:play={onPlay}
		on:pause={onPause}
		bind:this={audio}
		bind:paused
		src={track.preview_url}
		controls
		preload="none"
	></audio>
	<button
		aria-label={paused ? `Play ${track.name}` : `Pause ${track.name}`}
		on:click={() => {
			if (paused) {
				audio.play();
			} else {
				audio.pause();
			}
		}}
	>
		{#if paused}
			<Play aria-hidden focusable="false" color="var(--text-color)" />
		{:else}
			<Pause aria-hidden focusable="false" color="var(--text-color)" />
		{/if}
	</button>
</div>

<style lang="scss">
	.player {
		audio {
			display: none;
			:global(html.no-js) & {
				display: block;
				width: 100%;
			}
		}
		button {
			width: 12px;
			height: 12px;
			padding: 0;
			background: none;
			border: none;
			cursor: pointer;
			:global(svg) {
				fill: var(--text-color);
				width: 12px;
				height: 12px;
			}
			:global(html.no-js) & {
				display: none;
			}
		}
	}
</style>
