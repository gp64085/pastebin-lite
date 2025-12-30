import {
  errorResponse,
  generateShareableUrl,
  successResponse,
} from "@/lib/api-response";
import { db } from "@/lib/db";
import { pastes } from "@/lib/schema";
import { getEffectiveTime } from "@/lib/time";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { content, ttl_seconds, max_views } = body;

    // Validate the request body
    if (
      !content ||
      typeof content !== "string" ||
      content.trim().length === 0
    ) {
      return errorResponse(
        "Content is required and must be a non-empty string"
      );
    }

    const now = await getEffectiveTime();
    let expiresAt = null;

    if (ttl_seconds) {
      const ttl = parseInt(ttl_seconds);
      if (isNaN(ttl) || ttl <= 0) {
        return errorResponse("ttl_seconds must be a positive integer");
      }

      // Add seconds to the "effective" current time
      expiresAt = new Date(now.getTime() + ttl * 1000);
    }

    let remainingViews = null;
    if (max_views) {
      const views = parseInt(max_views);
      if (isNaN(views) || views < 1) {
        return errorResponse("max_views must be a positive integer");
      }

      remainingViews = views;
    }

    // Persist the paste in the database
    const [inserted] = await db
      .insert(pastes)
      .values({
        content,
        expiresAt,
        remainingViews,
      })
      .returning({ id: pastes.id });

    // Construct the shareable URL
    const url = generateShareableUrl(request, inserted.id);

    return successResponse({ id: inserted.id, url }, 201);
  } catch (error) {
    console.error("Error creating paste:", error);
    return errorResponse("Internal server error", 500);
  }
}