import { errorResponse, successResponse } from "@/lib/api-response";
import { getPasteAndDecrement } from "@/lib/pastes";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const paste = await getPasteAndDecrement(id);

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
