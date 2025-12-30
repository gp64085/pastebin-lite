import { getPasteAndDecrement } from "@/lib/pastes";
import { notFound } from "next/navigation";

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const paste = await getPasteAndDecrement(id);

  if (!paste) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full border border-gray-200">
        <h1 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
          Paste Content
        </h1>
        <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-100 p-4 rounded text-gray-900 overflow-x-auto">
          {paste.content}
        </pre>
        <div className="mt-6 text-xs text-gray-400 flex gap-4">
          {/* <span>ID: {paste.id}</span> */}
          {paste.remaining_views !== null && (
            <span>Views Left: {paste.remaining_views}</span>
          )}
          {paste.expires_at && (
            <span>Expires: {paste.expires_at.toLocaleString()}</span>
          )}
        </div>
      </div>
    </main>
  );
}
