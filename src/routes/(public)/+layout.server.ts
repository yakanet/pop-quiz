import { generateSessionToken } from '$lib/server/auth';
import type { Cookies } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { quizUser } from '$lib/server/db/schema';
import { db } from '$lib/server/db';

export async function load({ cookies }) {
  const anonymousUserId = await getOrCreateAnonymousUser(cookies);
  return { anonymousUserId };
}

/**
 * Retrieves an existing anonymous user ID from cookies or creates a new one if not present.
 * If a new anonymous user ID is created, it stores the ID in the database and sets the corresponding cookie.
 *
 * @param {Cookies} cookies - The cookies object used to get or set the anonymous user ID.
 * @return {Promise<string>} A promise that resolves to the anonymous user ID.
 */
async function getOrCreateAnonymousUser(cookies: Cookies): Promise<string> {
  let anonymousUserId = cookies.get('popquiz');
  const currentPoolId = 1;
  if (!anonymousUserId) {
    anonymousUserId = generateSessionToken();
    cookies.set('popquiz', anonymousUserId, {
      maxAge: 60 * 60 * 24 * 365 * 10,
      httpOnly: !dev,
      sameSite: 'lax',
      path: '/',
    });
  }
  await db
    .insert(quizUser)
    .values({ user_id: anonymousUserId, quizPollId: currentPoolId })
    .onConflictDoUpdate({
      target: [quizUser.user_id, quizUser.quizPollId],
      set: { updatedAt: new Date() },
    });
  return anonymousUserId;
}
