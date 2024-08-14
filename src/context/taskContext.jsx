import React, { createContext, useContext, useState, useCallback } from "react";
import tasksService from "@services/task.service";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState({
    toDo: [],
    inProgress: [],
    done: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      console.log("tasks fetched in context", loading);
      const toDo = await tasksService.getByType("toDo");
      const inProgress = await tasksService.getByType("inProgress");
      const done = await tasksService.getByType("done");
      setTasks({
        toDo: toDo.data,
        inProgress: inProgress.data,
        done: done.data,
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, loading, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
