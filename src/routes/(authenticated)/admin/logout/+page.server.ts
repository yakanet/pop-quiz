import { deleteSessionTokenCookie, redirectLoginPage } from '$lib/server/auth';

export async function load(event) {
  deleteSessionTokenCookie(event);
  redirectLoginPage();
}
