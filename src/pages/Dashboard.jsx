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

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    const { index: sourceIndex, droppableId: sourceId } = source;
    const { index: destIndex, droppableId: destId } = destination;
    console.log("source", sourceIndex, sourceId, "desti", destIndex, destId);

    if (!destId) return;
    console.log("sourceId", sourceId);
    console.log("the one which is moved", tasks[sourceId][sourceIndex]);
    const movedTask = tasks[sourceId][sourceIndex];
    console.log("new type", movedTask);

    const newSourceTasks = [...tasks[sourceId]];
    const newDestTasks = [...tasks[destId]];
    newSourceTasks.splice(sourceIndex, 1);
    newDestTasks.splice(destIndex, 0, { ...movedTask, type: destId });

    console.log("reordered source task", newSourceTasks);
    console.log("reordered dest tasks", newDestTasks);
    setTasks((prevTasks) => ({
      ...prevTasks,
      [sourceId]: newSourceTasks,
      [destId]: newDestTasks,
    }));
  };

  useEffect(() => {
    tasksService
      .get({})
      .then((response) => {
        const tasksData = response.data || [];
        const toDoTasks = tasksData.filter((task) => task.type === "To Do");
        const inProgressTasks = tasksData.filter(
          (task) => task.type === "In Progress"
        );
        const doneTasks = tasksData.filter((task) => task.type === "Done");

        setTasks({
          toDo: toDoTasks,
          inProgress: inProgressTasks,
          done: doneTasks,
        });
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

  console.log(tasks);

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
