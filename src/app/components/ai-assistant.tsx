"use client";

import { useState } from "react";

export default function AIAssistant({
  onAIResponded,
}: {
  onAIResponded: () => void;
}) {
  const [input, setInput] = useState("");
  const [currentLines, setCurrentLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const simulateAIResponse = (fullText: string) => {
    const lines = fullText.split("\n"); // Pisahkan berdasarkan baris
    let index = 0;
    setIsTyping(true);
    setCurrentLines([]); // Clear dulu

    const interval = setInterval(() => {
      setCurrentLines((prev) => [...prev, lines[index]]);
      index++;
      if (index >= lines.length) {
        clearInterval(interval);
        setIsTyping(false);
        onAIResponded(); // AI selesai merespon
      }
    }, 800); // jeda antar baris
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const res = await fetch("/api/ai-assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    const content =
      data.choices?.[0]?.message?.content || "No response from AI";

    simulateAIResponse(content); // animasi per baris
    setInput(""); // kosongkan input
  };

  return (
    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-200/20 dark:border-gray-800 text-black dark:text-white p-6 rounded-2xl mt-6 shadow-xl transition-all duration-300 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        🤖 <span>AI Task Assistant</span>
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // mencegah reload halaman
          handleSend(); // jalankan handleSend
        }}
        className="flex flex-col sm:flex-row gap-4 mb-4"
      >
        <input
          type="text"
          className="flex-1 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm shadow-inner"
          placeholder="Tanyakan apa pun ke AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all"
        >
          🚀 Kirim
        </button>
      </form>

      {currentLines.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mt-2 text-sm transition-all whitespace-pre-line">
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            AI:
          </span>
          <div className="mt-2">
            {currentLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
