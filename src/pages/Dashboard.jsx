import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Grid, Button } from "@mui/material";
import TaskList from "../components/TaskList";
import TaskEditor from "./TaskEditor";
import AddTask from "./AddTask";
import kanbanJson from "../kanban.json";
import tasksService from "../services/task.service";

function Dashboard({ withAddTask }) {
  const [kanbanDb, setKanbanDb] = useState([]);
  const initialKanbanDb = kanbanJson;

  useEffect(() => {
    tasksService.get({}).then((allTasks) => {
      console.log("fetched tasks", allTasks.data);
      allTasks.data ? setKanbanDb(allTasks.data) : setKanbanDb(initialKanbanDb);
    });
  }, []);

  const [openEditor, setOpenEditor] = useState(null);
  const [addTask, setAddTask] = useState(null);
  const navigate = useNavigate();

  const { taskId } = useParams();

  useEffect(() => {
    if (taskId && kanbanDb.some((task) => task._id === taskId)) {
      setOpenEditor(true);
    } else if (typeof taskId !== "undefined") {
      navigate("*");
    }
  }, [taskId]);

  useEffect(() => {
    setAddTask(withAddTask);
  }, [withAddTask]);

  return (
    <>
      {openEditor && (
        <TaskEditor
          setOpenEditor={setOpenEditor}
          kanbanDb={kanbanDb}
          setKanbanDb={setKanbanDb}
        />
      )}
      {addTask && (
        <AddTask
          setAddTask={setAddTask}
          kanbanDb={kanbanDb}
          setKanbanDb={setKanbanDb}
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
            kanbanDb={kanbanDb}
          />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TaskList
            listType="In Progress"
            setOpenEditor={setOpenEditor}
            kanbanDb={kanbanDb}
          />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TaskList
            listType="Done"
            setOpenEditor={setOpenEditor}
            kanbanDb={kanbanDb}
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
    </>
  );
}

export default Dashboard;
