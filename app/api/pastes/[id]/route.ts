import { errorResponse, successResponse } from "@/lib/api-response";
import { db } from "@/lib/db";
import { pastes } from "@/lib/schema";
import { getEffectiveTime } from "@/lib/time";
import { and, eq, gt, isNull, or, sql } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Check if the paste
    if (!paste) {
      return errorResponse("Paste not found or expired", 404);
    }

    return successResponse(paste);
  } catch (error) {
    console.error("Error retrieving paste:", error);
    return errorResponse("Internal server error", 500);
  }
}
