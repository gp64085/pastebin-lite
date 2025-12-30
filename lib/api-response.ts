import { NextResponse } from "next/server";

export function successResponse(
  data: Record<string, unknown>,
  status: number = 200
) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function generateShareableUrl(
  request: Request,
  pasteId: string
): string {
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}/p/${pasteId}`;
}
