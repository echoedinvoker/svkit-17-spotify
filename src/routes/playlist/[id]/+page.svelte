<script lang="ts">
	import ItemPage from '$components/ItemPage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: color = data.color;
	$: playlist = data.playlist;
	$: tracks = data.playlist.tracks;

	let filteredTracks: SpotifyApi.TrackObjectFull[];

	$: {
		filteredTracks = [];
		tracks.items.forEach((item) => {
			if (item.track) {
				filteredTracks = [...filteredTracks, item.track];
			}
		});
	}
</script>

<ItemPage title={playlist.name} image={playlist.images[0]?.url} {color} type={playlist.type}>
	></ItemPage
>
