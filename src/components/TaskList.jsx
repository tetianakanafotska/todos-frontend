import React from "react";
import { Card, CardHeader, CardActions } from "@mui/material";
import { Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { CardContent, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { styled } from "@mui/material/styles";

function TaskList({ listType, kanbanDB, setOpenEditor }) {
  return (
    <Card sx={{ mr: 3, bgcolor: "#eee" }} variant="elevation" elevation={2}>
      <h2>{listType}</h2>
      <div className="task-list-content">
        {kanbanDB.map((task) => {
          if (task.status === listType) {
            return (
              <TaskCard
                setOpenEditor={setOpenEditor}
                key={task.id}
                task={task}
              />
            );
          }
        })}
      </div>
      <Button aria-label="add a task" startIcon={<AddCircleOutlineIcon />}>
        Add a task
      </Button>
    </Card>
  );
}

export default TaskList;
