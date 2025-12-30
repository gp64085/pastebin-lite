"use client";

import { FormEvent, useState } from "react";
import SuccessView from "./components/SuccessView";
import PasteForm from "./components/PasteForm";

export default function Home() {
  const [paste, setPaste] = useState({
    content: "",
    ttl_seconds: 0,
    max_views: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdUrl, setCreatedUrl] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/pastes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paste),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }

      const path = new URL(data.url).pathname;
      setCreatedUrl(path);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setPaste((prev) => ({
      ...prev,
      [name]:
        name === "ttl_seconds" || name === "max_views"
          ? Math.max(0, parseInt(value) || 0)
          : value,
    }));
  };

  const resetForm = () => {
    setPaste({
      content: "",
      ttl_seconds: 0,
      max_views: 0,
    });

    setCreatedUrl("");
  };

  return (
    <main className="flex min-h-screen bg-gray-50 items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">New Paste</h1>
        {createdUrl ? (
          <SuccessView url={createdUrl} onReset={resetForm} />
        ) : (
          <PasteForm
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
            paste={paste}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </main>
  );
}
