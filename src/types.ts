// src/types.ts
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  deadline?: string; // format YYYY-MM-DD
  createdAt: string;
};
