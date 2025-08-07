"use client";

import "./globals.css";
import React, { useEffect, useState } from "react";
import { PencilLine, Trash2, Plus, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import AIAssistant from "./components/ai-assistant";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3 },
    ease: [0.25, 0.46, 0.45, 0.94],
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3 },
    ease: "easeInOut",
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 }, ease: "easeOut" },
};

const checkboxVariants = {
  checked: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.3 },
  },
  unchecked: {
    scale: 1,
    transition: { duration: 0.2 },
  },
};

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
          const todosWithIds = parsed.map((todo, index) => ({
            ...todo,
            id: todo.id || `todo-${Date.now()}-${index}`,
          }));
          setTodos(todosWithIds);
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
      const newTodo: Todo = {
        id: `todo-${Date.now()}`,
        text: input,
        completed: false,
      };
      setTodos([...todos, newTodo]);
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
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <AnimatePresence>
            {!aiResponded && !showTodo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex justify-center my-8"
              >
                <motion.button
                  onClick={() => setShowTodo(true)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="cursor-pointer bg-gradient-to-r 
                    from-pink-300 via-pink-500 to-fuchsia-600 
                    dark:from-red-600 dark:via-red-400 dark:to-neutral-800
                    text-white px-8 py-4 rounded-xl font-semibold 
                    shadow-lg transition-all duration-300 hover:brightness-110
                    flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Daftar To-Do
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(aiResponded || showTodo) && (
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Menjadi lebih baik
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Apa yang kamu mau lakuin sekarang?
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(aiResponded || showTodo) && (
              <motion.div
                className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Todo List Section */}
                <div className="w-full lg:w-2/3">
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
                    variants={formVariants}
                    whileHover={{
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    <motion.h3
                      className="text-xl font-semibold mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Tambah Hal Positif Hari Ini
                    </motion.h3>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <motion.input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Hal positif apa hari ini..."
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        whileFocus={{
                          scale: 1.02,
                          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                          transition: { duration: 0.2 },
                        }}
                      />
                      <motion.button
                        type="submit"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="cursor-pointer bg-gradient-to-r 
                          from-pink-300 via-pink-500 to-fuchsia-600 
                          dark:from-red-600 dark:via-red-400 dark:to-neutral-800
                          text-white px-6 py-3 rounded-xl font-semibold shadow-md 
                          transition-all duration-300 hover:brightness-110
                          flex items-center gap-2 justify-center"
                      >
                        {editIndex !== null ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Update
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Tambah
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>

                  <LayoutGroup>
                    <motion.ul
                      className="space-y-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <AnimatePresence mode="popLayout">
                        {todos.map((todo, index) => (
                          <motion.li
                            key={todo.id}
                            layout
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            whileHover={{
                              scale: 1.02,
                              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                              transition: { duration: 0.2 },
                            }}
                            className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex items-center gap-3">
                              <motion.div
                                variants={checkboxVariants}
                                animate={
                                  todo.completed ? "checked" : "unchecked"
                                }
                              >
                                <input
                                  type="checkbox"
                                  checked={todo.completed}
                                  onChange={() => toggleComplete(index)}
                                  className="cursor-pointer h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
                                />
                              </motion.div>
                              <motion.span
                                className={`${
                                  todo.completed
                                    ? "line-through text-gray-400"
                                    : ""
                                }`}
                                animate={{
                                  opacity: todo.completed ? 0.6 : 1,
                                  scale: todo.completed ? 0.98 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                {todo.text}
                              </motion.span>
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                onClick={() => handleEdit(index)}
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="flex items-center gap-2 px-3 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
                              >
                                <PencilLine className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  Edit
                                </span>
                              </motion.button>

                              <motion.button
                                onClick={() => handleDelete(index)}
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="flex items-center gap-2 px-3 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  Hapus
                                </span>
                              </motion.button>
                            </div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </motion.ul>
                  </LayoutGroup>

                  {todos.length === 0 && (aiResponded || showTodo) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="text-center py-12 text-gray-500 dark:text-gray-400"
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                        className="text-6xl mb-4"
                      >
                        ✨
                      </motion.div>
                      <p className="text-lg">
                        Belum ada hal positif hari ini. Yuk mulai tambahkan!
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* AI Assistant Section */}
                <div className="w-full lg:w-1/3 lg:border-l lg:pl-6 border-gray-300 dark:border-gray-700">
                  <AIAssistant onAIResponded={() => setAiResponded(true)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
