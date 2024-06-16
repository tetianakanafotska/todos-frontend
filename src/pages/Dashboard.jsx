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
    const fetchTasksByType = async () => {
      try {
        const toDoTasks = await tasksService.getByType("toDo");
        const inProgressTasks = await tasksService.getByType("inProgress");
        const doneTasks = await tasksService.getByType("done");
        setTasks({
          toDo: toDoTasks.data,
          inProgress: inProgressTasks.data,
          done: doneTasks.data,
        });
      } catch (error) {
        console.error("Failed to fetch and set tasks:", error);
      }
    };
    fetchTasksByType();
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

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const { index: sourceIndex, droppableId: sourceId } = source;
    const { index: destIndex, droppableId: destId } = destination;

    const updatedTasks = { ...tasks };
    const sourceTasks = updatedTasks[sourceId];
    const destTasks = updatedTasks[destId];

    const [movedTask] = sourceTasks.splice(sourceIndex, 1);

    destTasks.splice(destIndex, 0, {
      ...movedTask,
      type: destId,
      orderInList: destIndex,
    });
    const reorderedTask = await tasksService.put(movedTask._id, {
      ...movedTask,
      type: destId,
      orderInList: destIndex,
    });

    console.log("reordered task", reorderedTask.data);
    setTasks(updatedTasks);
    console.log("updated tasks", updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {openEditor && (
        <TaskEditor
          setOpenEditor={setOpenEditor}
          tasks={tasks}
          setTasks={(type, newTask) =>
            setTasks((prevTasks) => {
              return {
                ...prevTasks,
                [type]: [...prevTasks[type], newTask],
              };
            })
          }
        />
      )}
      {addTask && (
        <AddTask
          setAddTask={setAddTask}
          tasks={tasks}
          setTasks={(type, newTask) =>
            setTasks((prevTasks) => {
              return {
                ...prevTasks,
                [type]: [...prevTasks[type], newTask],
              };
            })
          }
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
