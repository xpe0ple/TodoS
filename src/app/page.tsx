"use client";

import "./globals.css";
import React, { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AIAssistant from "./components/ai-assistant";
import { PencilLine, Trash2 } from "lucide-react";

interface Todo {
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [aiResponded, setAiResponded] = useState(false);
  const [showTodo, setShowTodo] = useState(false);

  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        const parsed = JSON.parse(storedTodos);
        if (Array.isArray(parsed)) {
          setTodos(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load todos from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex].text = input;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: input, completed: false }]);
    }

    setInput("");
  };

  const toggleComplete = (index: number) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const handleDelete = (index: number) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  const handleEdit = (index: number) => {
    setInput(todos[index].text);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AIAssistant onAIResponded={() => setAiResponded(true)} />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          {!aiResponded && !showTodo && (
            <div className="flex justify-center my-8">
              <button
                onClick={() => setShowTodo(true)}
                className="cursor-pointer 
      bg-gradient-to-r 
      from-pink-300 via-pink-500 to-fuchsia-600 
      dark:from-red-600 dark:via-red-400 dark:to-neutral-800
      text-white px-6 py-3 rounded-xl font-semibold 
      shadow-md transition-all duration-300 hover:brightness-110"
              >
                Daftar To-Do
              </button>
            </div>
          )}
          {/* Elemen H1 dan P hanya muncul setelah AI direspon */}
          {(aiResponded || showTodo) && (
            <>
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Menjadi lebih baik
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Apa yang kamu mau lakuin sekarang?
              </p>
            </>
          )}

          {(aiResponded || showTodo) && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Tambah Hal Positif Hari Ini
                </h3>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Hal positif apa hari ini..."
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer bg-gradient-to-r 
    from-pink-300 via-pink-500 to-fuchsia-600 
    dark:from-red-600 dark:via-red-400 dark:to-neutral-800
    text-white px-6 py-3 rounded-xl font-semibold shadow-md 
    transition-all duration-300 hover:brightness-110"
                  >
                    {editIndex !== null ? "Update" : "Tambah"}
                  </button>
                </form>
              </div>

              <ul className="mt-8 space-y-3">
                {todos.map((todo, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleComplete(index)}
                        className="cursor-pointer h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
                      />
                      <span
                        className={`${
                          todo.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="flex items-center gap-2 px-3 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
                      >
                        <PencilLine className="w-4 h-4" />
                        <span className="text-sm font-medium">Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(index)}
                        className="flex items-center gap-2 px-3 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Hapus</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
