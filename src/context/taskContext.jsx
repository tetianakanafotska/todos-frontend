import React, { createContext, useContext, useState, useCallback } from "react";
import tasksService from "@services/task.service";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const tasks = await tasksService.get();
      setTasks(tasks.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
