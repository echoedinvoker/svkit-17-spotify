import { fetchRefresh } from "$lib/helpers";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch: _fetch, parent }) => {

  const fetch = (path: string) => fetchRefresh(_fetch, path)

  const { user } = await parent()

  const catsRes = await fetch(`api/spotify/browse/categories`)

  const catsJSON = catsRes.ok ? await catsRes.json() as SpotifyApi.MultipleCategoriesResponse : undefined

  const randomCats = catsJSON ? catsJSON.categories.items.sort(() => 0.5 - Math.random()).slice(0, 3) : []
  const randomCatsPromises = randomCats.map(cat => fetch(`api/spotify/browse/categories/${cat.id}/playlists?limit=6`))

  const [newReleasesRes, featuredPlaylistsRes, userPlaylistsRes, ...randomCatsPlaylistsRes] = await Promise.all([
    fetch("api/spotify/browse/new-releases?limit=6"),
    fetch("api/spotify/browse/featured-playlists?limit=6"),
    fetch(`api/spotify/users/${user?.id}/playlists?limit=6`),
    ...randomCatsPromises
  ])

  const [newReleases, featuredPlaylists, userPlaylists, ...categoriesPlaylists] = await Promise.all([
    newReleasesRes.ok ? newReleasesRes.json() as Promise<SpotifyApi.ListOfNewReleasesResponse> : undefined,
    featuredPlaylistsRes.ok ? featuredPlaylistsRes.json() as Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse> : undefined,
    userPlaylistsRes.ok ? userPlaylistsRes.json() as Promise<SpotifyApi.ListOfUsersPlaylistsResponse> : undefined,
    ...randomCatsPlaylistsRes.map(res => res.ok ? res.json() as Promise<SpotifyApi.CategoryPlaylistsResponse> : undefined)
  ])

  return {
    newReleases,
    featuredPlaylists,
    userPlaylists,
    homeCategories: randomCats,
    categoriesPlaylists
  }
} 
