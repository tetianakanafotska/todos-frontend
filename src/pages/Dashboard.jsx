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
    const allTasks = Object.values(tasks).flat();
    const taskExists = allTasks.some((task) => task._id === taskId);

    if (taskId) {
      if (taskExists) {
        setOpenEditTask(true);
      } else {
        navigate("*");
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

    const taskMap = { ...tasks };
    const sourceTasks = [...taskMap[sourceId]];
    const destTasks = sourceId === destId ? sourceTasks : [...taskMap[destId]];
    const [movedTask] = sourceTasks.splice(sourceIndex, 1);
    const taskLeft = destTasks[destIndex - 1];
    const taskRight = destTasks[destIndex];
    const leftPosition = taskLeft ? taskLeft.position : 0;
    const rightPosition = taskRight ? taskRight.position : leftPosition + 2;
    const newPosition = (leftPosition + rightPosition) / 2;

    const updatedTask = { ...movedTask, type: destId, position: newPosition };
    destTasks.splice(destIndex, 0, updatedTask);

    setTasks((prevTasks) => ({
      ...prevTasks,
      [sourceId]: sourceTasks,
      [destId]: destTasks,
    }));

    await tasksService.put(movedTask._id, updatedTask);
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
              <TaskList taskType="toDo" tasks={tasks["toDo"]} />
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
              <TaskList taskType="inProgress" tasks={tasks["inProgress"]} />
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
              <TaskList taskType="done" tasks={tasks["done"]} />
            )}
          </Grid>
        </Grid>
      </DragDropContext>
    </>
  );
}

export default Dashboard;
