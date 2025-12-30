interface SuccessViewProps {
  url: string;
  onReset: () => void;
}

export default function SuccessView({ url, onReset }: SuccessViewProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded p-6 text-center space-y-4">
      <h2 className="text-green-800 font-bold text-lg">Paste Created!</h2>
      <p className="text-sm text-green-700">Here is your shareable link:</p>

      <div className="bg-white p-3 rounded border border-green-300 break-all font-mono text-sm text-gray-800">
        {url}
      </div>

      <div className="flex gap-2 justify-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition"
        >
          View Paste
        </a>
        <button
          onClick={onReset}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded cursor-pointer text-sm hover:bg-gray-300 transition"
        >
          Create Another
        </button>
      </div>
    </div>
  );
}
