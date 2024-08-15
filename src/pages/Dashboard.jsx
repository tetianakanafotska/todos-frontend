import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Skeleton } from "@mui/material";
import TaskList from "@components/TaskList";
import EditTask from "./EditTask";
import AddTask from "./AddTask";
import tasksService from "@services/task.service";
import { DragDropContext } from "react-beautiful-dnd";
import { useTasks } from "@context/taskContext.jsx";

function Dashboard() {
  const { tasks, fetchTasks, loading, setTasks } = useTasks();
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);

  const { taskId } = useParams();
  const { taskType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (tasks.length > 0) {
      const taskExists = tasks.find((task) => task._id === taskId);
      if (taskId) {
        if (taskExists) {
          setOpenEditTask(true);
        } else {
          navigate("*");
        }
      }
    }
  }, [taskId, tasks, navigate, setOpenEditTask]);

  useEffect(() => {
    if (taskType) {
      setOpenAddTask(true);
    }
  }, [taskType]);

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const { index: sourceIndex, droppableId: sourceId } = source;
    const { index: destIndex, droppableId: destId } = destination;
    if (sourceId === destId && sourceIndex === destIndex) return;

    const taskMap = [...tasks];
    const sourceTasks = taskMap.filter((task) => task.type === sourceId);
    const destTasks =
      sourceId === destId
        ? sourceTasks
        : taskMap.filter((task) => task.type === destId);

    const [movedTask] = sourceTasks.splice(sourceIndex, 1);

    const taskLeft = destTasks[destIndex - 1];
    const taskRight = destTasks[destIndex];
    const leftPosition = taskLeft ? taskLeft.position : 0;
    const rightPosition = taskRight ? taskRight.position : leftPosition + 2;
    const newPosition = (leftPosition + rightPosition) / 2;

    const updatedTask = { ...movedTask, type: destId, position: newPosition };
    destTasks.splice(destIndex, 0, updatedTask);
    const remainingTasks = taskMap.filter(
      (task) => task.type !== sourceId && task.type !== destId
    );
    const updatedTasks = [...remainingTasks, ...sourceTasks, ...destTasks];
    setTasks(updatedTasks);
    await tasksService.put(updatedTask._id, updatedTask);
  };

  return (
    <>
      {openEditTask && (
        <EditTask
          open={openEditTask}
          setOpen={setOpenEditTask}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}
      {openAddTask && (
        <AddTask
          open={openAddTask}
          setOpen={setOpenAddTask}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid
          container
          spacing="10px"
          component="main"
          sx={{ ml: "80px" }}
          width="calc(100vw - 80px)"
          className="main-container"
        >
          <Grid item lg={4} md={4} sm={12} xs={12}>
            {loading ? (
              <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height={80}
              />
            ) : (
              <TaskList
                taskType="toDo"
                tasks={tasks.filter((task) => task.type === "toDo")}
              />
            )}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            {loading ? (
              <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height={80}
              />
            ) : (
              <TaskList
                taskType="inProgress"
                tasks={tasks.filter((task) => task.type === "inProgress")}
              />
            )}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            {loading ? (
              <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height={80}
              />
            ) : (
              <TaskList
                taskType="done"
                tasks={tasks.filter((task) => task.type === "done")}
              />
            )}
          </Grid>
        </Grid>
      </DragDropContext>
    </>
  );
}

export default Dashboard;
