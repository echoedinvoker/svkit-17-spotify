<script lang="ts">
	import ItemPage from '$components/ItemPage.svelte';
	import TrackList from '$components/TrackList.svelte';
	import { getCopyrightSymbol } from '$helpers';
	import type { PageData } from './$types';

	export let data: PageData;

	$: album = data.album;
	$: color = data?.color;
</script>

<ItemPage
	title={album.name}
	image={album.images[0]?.url}
	type={album.album_type}
	color={color?.color}
>
	<p class="meta" slot="meta">
		<span class="artists">
			{album.artists.map((artist) => artist.name).join(', ')}
		</span>
		<span class="date">
			{new Date(album.release_date).getFullYear()}
		</span>
		<span class="tracks-count">
			{`${album.total_tracks} Track${album.total_tracks > 1 ? 's' : ''}`}
		</span>
	</p>
	<TrackList tracks={album.tracks.items} />
</ItemPage>

<div class="credit">
	<p class="date">
		{new Date(album.release_date).toLocaleDateString('en-US', { dateStyle: 'medium' })}
	</p>
	{#each album.copyrights as copyright}
		<p class="copyright">
			{getCopyrightSymbol(copyright.type)}
			{copyright.text}
		</p>
	{/each}
</div>

<style lang="scss">
	.meta {
		font-size: functions.toRem(13);
		font-weight: 600;
		span {
			margin-right: 5px;
			&.tracks-count {
				font-weight: 400;
				margin: 0 0 0 5px;
				color: var(--light-gray);
			}
		}
	}
	.credit {
		margin-top: 40px;
		p {
			margin: 0;
			color: var(--light-gray);
			font-size: functions.toRem(11);
			&.date {
				font-size: functions.toRem(14);
			}
		}
	}
</style>
