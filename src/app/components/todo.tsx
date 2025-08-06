"use client";

import { useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-24 py-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">📝 To-Do List</h3>

        {/* Input dan Tombol */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tambahkan task..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            onClick={addTodo}
            className="bg-gradient-to-r 
    from-pink-300 via-pink-500 to-fuchsia-600 
    dark:from-red-600 dark:via-red-400 dark:to-neutral-800
    text-white px-5 py-2.5 rounded-xl font-semibold 
    shadow-md hover:brightness-110 transition-all duration-300"
          >
            ➕ Tambah
          </button>
        </div>

        {/* Daftar Todo */}
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg"
            >
              {todo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
