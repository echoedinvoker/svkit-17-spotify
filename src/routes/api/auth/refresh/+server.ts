import { SPOTIFY_APP_CLIENT_ID, SPOTIFY_APP_CLIENT_SECRET } from "$env/static/private";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ cookies, fetch }) => {
  const refreshToken = cookies.get("spotify_auth_refresh_token");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_APP_CLIENT_ID}:${SPOTIFY_APP_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken || "",
    })
  })
  const responseJSON = await response.json();

  if (responseJSON.error) {
    cookies.delete("spotify_auth_access_token", { path: "/" });
    cookies.delete("spotify_auth_refresh_token", { path: "/" });
    throw error(401, responseJSON.error_description)
  }

  cookies.set("spotify_auth_access_token", responseJSON.access_token, { path: "/" });
  cookies.set("spotify_auth_refresh_token", responseJSON.refresh_token, { path: "/" });

  return json(responseJSON)
}
