import React, { useEffect } from "react";
import TaskList from "../components/TaskList";
import { Grid } from "@mui/material";
import { useState } from "react";
import TaskEditor from "./TaskEditor";
import AddTask from "./AddTask";
import kanbanJson from "../kanban.json";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function Dashboard({ withEditor, withAddTask }) {
  const [kanbanDB, setKanbanDB] = useState(kanbanJson);
  const [openEditor, setOpenEditor] = useState(null);
  const [addTask, setAddTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setOpenEditor(withEditor);
  }, [withEditor]);

  useEffect(() => {
    setAddTask(withAddTask);
  }, [withAddTask]);

  //pass params here
  //if params true, setopen editor to true
  //useeffect here
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
        height="calc(100vh - 45px)"
      >
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <TaskList
            listType="To Do"
            setOpenEditor={setOpenEditor}
            kanbanDB={kanbanDB}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <TaskList
            listType="In Progress"
            setOpenEditor={setOpenEditor}
            kanbanDB={kanbanDB}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <TaskList
            listType="Done"
            setOpenEditor={setOpenEditor}
            kanbanDB={kanbanDB}
          />
        </Grid>
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
    </>
  );
}

export default Dashboard;
