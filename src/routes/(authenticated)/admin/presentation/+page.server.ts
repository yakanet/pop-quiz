import { db } from '$lib/server/db';
import { quizUser } from '$lib/server/db/schema';

export async function load({}) {
  const stats = {
    total: await db.$count(quizUser)
  }
  return {
    stats
  }
}