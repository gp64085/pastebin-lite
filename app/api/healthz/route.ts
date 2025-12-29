import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Running a simple query to check if the database is reachable
    await db.execute(sql`SELECT 1 AS "hello"`);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Health check failed: ", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
