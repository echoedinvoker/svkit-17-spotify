<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: color = data.color;
	$: playlist = data.playlist;
	$: tracks = data.playlist.tracks;
</script>
