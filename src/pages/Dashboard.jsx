import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Grid, Button } from "@mui/material";
import TaskList from "../components/TaskList";
import TaskEditor from "./TaskEditor";
import AddTask from "./AddTask";
import kanbanJson from "../kanban.json";

function Dashboard({ withAddTask }) {
  const initialKanbanDB = kanbanJson;

  const [kanbanDB, setKanbanDB] = useState(() => {
    const storedDB = localStorage.getItem("kanbanDB");
    return storedDB ? JSON.parse(storedDB) : initialKanbanDB;
  });

  const [openEditor, setOpenEditor] = useState(null);
  const [addTask, setAddTask] = useState(null);
  const navigate = useNavigate();

  const { taskId } = useParams();

  useEffect(() => {
    if (taskId) {
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
          kanbanDB={kanbanDB}
          setKanbanDB={setKanbanDB}
        />
      )}
      {addTask && (
        <AddTask
          setAddTask={setAddTask}
          kanbanDB={kanbanDB}
          setKanbanDB={setKanbanDB}
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
            kanbanDB={kanbanDB}
          />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TaskList
            listType="In Progress"
            setOpenEditor={setOpenEditor}
            kanbanDB={kanbanDB}
          />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TaskList
            listType="Done"
            setOpenEditor={setOpenEditor}
            kanbanDB={kanbanDB}
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
