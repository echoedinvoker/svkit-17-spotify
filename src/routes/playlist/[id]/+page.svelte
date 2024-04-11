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

	const followersFormat = Intl.NumberFormat('en', { notation: 'compact' });
</script>

<ItemPage title={playlist.name} image={playlist.images[0]?.url} {color} type={playlist.type}>
	<div slot="meta">
		<p class="playlist-description">
			{@html playlist.description}
		</p>
		<p class="meta">
			<span>{playlist.owner.display_name}</span>
			<span>{followersFormat.format(playlist.followers.total)}</span>
			<span>{playlist.tracks.total} Tracks</span>
		</p>
	</div>
</ItemPage>
