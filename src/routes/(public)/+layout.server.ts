import { generateSessionToken } from '$lib/server/auth';
import { dev } from '$app/environment';
import { quizUser } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { getRequestEvent } from '$app/server';

export async function load() {
  return {
    anonymousUserId: await getOrCreateAnonymousUser(),
  };
}

/**
 * Retrieves an existing anonymous user ID from cookies or creates a new one if not present.
 * If a new anonymous user ID is created, it stores the ID in the database and sets the corresponding cookie.
 *
 * @return {Promise<string>} A promise that resolves to the anonymous user ID.
 */
async function getOrCreateAnonymousUser(): Promise<string> {
  const event = getRequestEvent();
  let anonymousUserId = event.cookies.get('popquiz');
  if (!anonymousUserId) {
    anonymousUserId = generateSessionToken();
    event.cookies.set('popquiz', anonymousUserId, {
      maxAge: 60 * 60 * 24 * 365 * 10,
      httpOnly: !dev,
      secure: !dev,
      sameSite: 'lax',
      path: '/',
    });
  }
  await db
    .insert(quizUser)
    .values({ user_id: anonymousUserId, ip: event.getClientAddress() })
    .onConflictDoUpdate({
      target: [quizUser.user_id],
      set: { updatedAt: new Date(), ip: event.getClientAddress() },
    });
  return anonymousUserId;
}
