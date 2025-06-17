"use client";

import { useState } from "react";

export default function QuizPage() {
  const [inputs, setInputs] = useState({
    journey: "",
    feeling: "",
    peakState: "",
    extraNote: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const minLength = 20;
    const invalid = Object.values(inputs).filter(
      (val, i) => i < 3 && val.trim().length < minLength
    );

    if (invalid.length > 0) {
      setResult("⚠️ Please provide more detailed responses (at least 20 characters per main question).");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/ollama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const raw = await response.text();
      console.log("🔍 RAW RESPONSE:", raw);

      try {
        const data = JSON.parse(raw);
        setResult(data.suggestions || "❌ Could not generate meaningful insights.");
      } catch (e) {
        console.error("❌ JSON parsing failed", e);
        setResult("❌ Invalid response from AI. Please try again.");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setResult("❌ Network error. Please try again.");
    }

    setLoading(false);
  };

  const formatMarkdownBold = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🧭 Discover Your Path</h1>

      {["journey", "feeling", "peakState", "extraNote"].map((key, i) => (
        <div key={i} className="mb-5">
          <label className="block mb-2 font-semibold capitalize">
            {key === "journey" && "1. Tell me about your journey so far"}
            {key === "feeling" && "2. How do you feel about your life right now?"}
            {key === "peakState" && "3. When do you feel most productive and joyful?"}
            {key === "extraNote" && "4. Want to share anything else about yourself?"}
          </label>
          <textarea
            name={key}
            value={inputs[key as keyof typeof inputs]}
            onChange={handleChange}
            rows={4}
            className="w-full border p-3 rounded resize-none"
            placeholder="Type your response..."
            required={key !== "extraNote"}
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition w-full"
      >
        {loading ? "Thinking..." : "Get My Insights"}
      </button>

      {result && (
        <div className="mt-8 bg-white border shadow-md rounded-lg p-6 space-y-6 text-gray-800 leading-relaxed">
          {/* AI Output */}
          <div dangerouslySetInnerHTML={{ __html: formatMarkdownBold(result) }} />

          {/* Follow-Up Questions */}
          {result.includes("**Follow-Up Questions:**") && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-purple-700">🧠 Follow-Up Questions</h2>
              <ul className="list-disc list-inside text-gray-800 space-y-2">
                {result
                  .split("**Follow-Up Questions:**")[1]
                  ?.split(/\d+\.\s|\n/)
                  ?.filter((q) => q.trim().length > 5)
                  .map((q, idx) => (
                    <li key={idx}>{q.trim()}</li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
