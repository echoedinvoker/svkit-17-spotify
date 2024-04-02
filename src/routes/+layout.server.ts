import { SPOTIFY_BASE_URL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies, fetch, url }) => {
  const accessToken = cookies.get("spotify_auth_access_token");
  const refreshToken = cookies.get("spotify_auth_refresh_token");

  if (!accessToken) {
    return {
      user: null
    };
  }

  const profileRes = await fetddddch(`${SPOTIFY_BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (profileRes.ok) {
    const profile: SpotifyApi.CurrentUsersProfileResponse = await profileRes.json();
    return {
      user: profile
    };
  }

  if (profileRes.status === 401 && refreshToken) {
    const refreshRes = await fetch("/api/auth/refresh")

    if (refreshRes.ok) {
      throw redirect(307, url.pathname)
    }

    return {
      user: null
    }
  }

  return {
    user: null
  }

}
