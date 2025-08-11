"use client";

import { useState } from "react";

// Struktur todo sekarang punya teks dan deadline
type TodoItem = {
  text: string;
  deadline: string;
};

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");

  const addTodo = () => {
    if (input.trim() === "" || deadline.trim() === "") return;
    setTodos([...todos, { text: input, deadline }]);
    setInput("");
    setDeadline("");
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-24 py-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">📝 To-Do List</h3>

        {/* Input Task + Deadline */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tambahkan task..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            onClick={addTodo}
            className="bg-gradient-to-r from-pink-300 via-pink-500 to-fuchsia-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:brightness-110 transition-all duration-300"
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
              <p className="font-medium">{todo.text}</p>
              <p className="text-sm text-gray-600">
                📅 Deadline:{" "}
                {new Date(todo.deadline).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
