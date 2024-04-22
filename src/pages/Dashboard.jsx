import React from "react";
import TaskList from "../components/TaskList";
import { Grid } from "@mui/material";
import { useState } from "react";
import TaskEditor from "./TaskEditor";
import kanbanDB from "../kanban.json";

function Dashboard() {
  const [openEditor, setOpenEditor] = useState(false);
  return (
    <>
      {openEditor && (
        <TaskEditor setOpenEditor={setOpenEditor} kanbanDB={kanbanDB} />
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
            setOpenEditor={setOpenEditor}
            kanbanDB={kanbanDB}
            listType="To Do"
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <TaskList
            setOpenEditor={setOpenEditor}
            kanbanDB={kanbanDB}
            listType="In Progress"
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <TaskList
            setOpenEditor={setOpenEditor}
            kanbanDB={kanbanDB}
            listType="Done"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
