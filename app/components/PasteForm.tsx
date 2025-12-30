import { ChangeEvent, FormEvent } from "react";

interface Paste {
  content: string;
  ttl_seconds: number;
  max_views: number;
}
interface PasteFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onInputChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  paste: Paste;
  loading: boolean;
  error: string;
}

export default function PasteForm({
  onSubmit,
  paste,
  onInputChange,
  loading,
  error,
}: PasteFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content
        </label>
        <textarea
          value={paste.content}
          onChange={onInputChange}
          required
          rows={6}
          name="content"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            TTL in seconds
          </label>
          <input
            type="number"
            name="ttl_seconds"
            min={0}
            value={paste.ttl_seconds ?? ""}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max views
          </label>
          <input
            type="number"
            name="max_views"
            value={paste.max_views ?? ""}
            onChange={onInputChange}
            min={0}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
          />
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 dasabled:opacity-50 transition-colors font-medium cursor-pointer"
      >
        {loading ? "Creating" : "Create Paste"}
      </button>
    </form>
  );
}
