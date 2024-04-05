import { fetchRefresh } from "$helpers";
import { error, type NumericRange } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params, depends, route }) => {

  depends(`api:${route.id}`)

  const { id } = params;
  const res = await fetchRefresh(fetch, `/api/spotify/albums/${id}aaa`);

  if (!res.ok) {
    throw error(res.status as NumericRange<400, 599>, 'Failed to load album!')
  }

  const album: SpotifyApi.SingleAlbumResponse = await res.json();

  let color = null;

  if (album.images.length) {
    const colorRes = await fetch(
      `/api/average-color/?${new URLSearchParams({
        image: album.images[0].url
      }).toString()}`
    );
    if (colorRes.ok) {
      color = await colorRes.json();
    }
  }

  return {
    album,
    title: album.name,
    color
  }
}
