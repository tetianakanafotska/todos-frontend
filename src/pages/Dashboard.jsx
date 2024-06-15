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
  const [allTasks, setAllTasks] = useState([]);
  const [openEditor, setOpenEditor] = useState(null);
  const [addTask, setAddTask] = useState(null);
  const { taskId } = useParams();
  const navigate = useNavigate();

  const handleDragEnd = (result) => {
    const {
      source: { index: sourceIndex, droppableId: sourceId },
      destination: { index: destIndex, droppableId: destId },
    } = result;

    console.log("source", sourceIndex, sourceId, "desti", destIndex, destId);

    if (!destination) return;

    const reorderedTasks = Array.from(allTasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);

    setAllTasks(reorderedTasks);
  };

  useEffect(() => {
    tasksService
      .get({})
      .then((response) => {
        setAllTasks(response.data);
      })
      .catch((err) => {
        console.error("Failed to fetch all tasks", err);
      });
  }, []);

  useEffect(() => {
    if (taskId && allTasks.some((task) => task._id === taskId)) {
      setOpenEditor(true);
    } else if (typeof taskId !== "undefined") {
      navigate("*");
    }
  }, [taskId]);

  useEffect(() => {
    setAddTask(withAddTask);
  }, [withAddTask]);

  console.log(allTasks);

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
            listType="To Do"
            setOpenEditor={setOpenEditor}
            allTasks={allTasks}
          />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TaskList
            listType="In Progress"
            setOpenEditor={setOpenEditor}
            allTasks={allTasks}
          />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TaskList
            listType="Done"
            setOpenEditor={setOpenEditor}
            allTasks={allTasks}
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
