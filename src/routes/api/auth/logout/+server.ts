import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = ({ cookies }) => {
  cookies.delete("spotify_auth_access_token", { path: "/" });
  cookies.delete("spotify_auth_refresh_token", { path: "/" });

  throw redirect(303, "/login")
}
