// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      user: SpotifyApi.CurrentUsersProfileResponse | null;
      title?: string;
      color?: string | null;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

declare interface Window {
  refreshPromise: Promise<Response> | null
}
