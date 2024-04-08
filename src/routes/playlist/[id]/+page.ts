import { fetchRefresh } from "$helpers";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ fetch: _fetch, params }) => {
  const fetch = (path: string) => fetchRefresh(_fetch, path)

}
