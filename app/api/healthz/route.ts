import { errorResponse, successResponse } from "@/lib/api-response";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // Running a simple query to check if the database is reachable
    await db.execute(sql`SELECT 1 AS "hello"`);

    return successResponse({ ok: true });
  } catch (error) {
    console.error("Health check failed: ", error);
    return errorResponse("Internal server error", 500);
  }
}
