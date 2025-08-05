"use client";

import { useState } from "react";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const res = await fetch("/api/ai-assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setResponse(data.choices?.[0]?.message?.content || "No response from AI");
  };

  return (
    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-200/20 dark:border-gray-800 text-black dark:text-white p-6 rounded-2xl mt-6 shadow-xl transition-all duration-300 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        🤖 <span>AI Task Assistant</span>
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          className="flex-1 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm shadow-inner"
          placeholder="Tanyakan apa pun ke AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all"
        >
          🚀 Kirim
        </button>
      </div>

      {response && (
        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mt-2 text-sm transition-all">
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            AI:
          </span>{" "}
          {response}
        </div>
      )}
    </div>
  );
}
