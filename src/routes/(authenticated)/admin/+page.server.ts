import { db } from '$lib/server/db';
import { quizPool } from '$lib/server/db/schema';

export async function load() {
  const pools = await db.select().from(quizPool);
  return {
    pools,
  };
}
