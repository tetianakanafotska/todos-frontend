import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Grid, Button } from "@mui/material";
import TaskList from "../components/TaskList";
import TaskEditor from "./TaskEditor";
import AddTask from "./AddTask";
import tasksService from "../services/task.service";
import { DragDropContext } from "react-beautiful-dnd";

function Dashboard({ withAddTask }) {
  const [tasks, setTasks] = useState({
    toDo: [],
    inProgress: [],
    done: [],
  });
  const [openEditor, setOpenEditor] = useState(null);
  const [addTask, setAddTask] = useState(null);
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    tasksService
      .get({})
      .then((response) => {
        const tasksData = response.data || [];
        const updatedTasks = {
          toDo: tasksData.filter((task) => task.type === "toDo"),
          inProgress: tasksData.filter((task) => task.type === "inProgress"),
          done: tasksData.filter((task) => task.type === "done"),
        };
        setTasks(updatedTasks);
      })
      .catch((err) => {
        console.error("Failed to fetch all tasks", err);
      });
  }, []);

  useEffect(() => {
    if (
      taskId &&
      [...tasks.toDo, ...tasks.inProgress, ...tasks.done].some(
        (task) => task._id === taskId
      )
    ) {
      setOpenEditor(true);
    } else if (typeof taskId !== "undefined") {
      navigate("*");
    }
  }, [taskId]);

  useEffect(() => {
    setAddTask(withAddTask);
  }, [withAddTask]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const { index: sourceIndex, droppableId: sourceId } = source;
    const { index: destIndex, droppableId: destId } = destination;

    const updatedTasks = { ...tasks };
    const sourceTasks = updatedTasks[sourceId];
    const destTasks = updatedTasks[destId];

    const [movedTask] = sourceTasks.splice(sourceIndex, 1);
    destTasks.splice(destIndex, 0, { ...movedTask, type: destId });

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {openEditor && (
        <TaskEditor
          setOpenEditor={setOpenEditor}
          allTasks={allTasks}
          setAllTasks={setAllTasks}
        />
      )}
      {addTask && (
        <AddTask
          setAddTask={setAddTask}
          allTasks={allTasks}
          setAllTasks={setAllTasks}
        />
      )}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        component="main"
        width="calc(100vw - 80px)"
        className="dashboard-main"
      >
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TaskList
            listType="toDo"
            setOpenEditor={setOpenEditor}
            tasks={tasks.toDo}
          />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TaskList
            listType="inProgress"
            setOpenEditor={setOpenEditor}
            tasks={tasks.inProgress}
          />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TaskList
            listType="done"
            setOpenEditor={setOpenEditor}
            tasks={tasks.done}
          />
        </Grid>
        <Button
          id="btn-add-task"
          size="large"
          variant="contained"
          aria-label="add a task"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            navigate("/addTask");
          }}
        >
          Add a task
        </Button>
      </Grid>
    </DragDropContext>
  );
}

export default Dashboard;
