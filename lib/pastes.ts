import { and, eq, gt, isNull, or, sql } from "drizzle-orm";
import { db } from "./db";
import { pastes } from "./schema";
import { getEffectiveTime } from "./time";

export async function getPasteAndDecrement(id: string) {
  const now = await getEffectiveTime();

  // ATOMIC TRANSACTION
  const [paste] = await db
    .update(pastes)
    .set({
      remainingViews: sql`CASE 
            WHEN ${pastes.remainingViews} IS NULL THEN NULL 
            ELSE ${pastes.remainingViews} - 1 
          END`,
    })
    .where(
      and(
        eq(pastes.id, id),
        or(isNull(pastes.expiresAt), gt(pastes.expiresAt, now)),
        or(isNull(pastes.remainingViews), gt(pastes.remainingViews, 0))
      )
    )
    .returning({
      content: pastes.content,
      remaining_views: pastes.remainingViews,
      expires_at: pastes.expiresAt,
    });

  return paste || null;
}
