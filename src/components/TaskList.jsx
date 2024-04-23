import React from "react";
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TaskCard from "./TaskCard";

function TaskList({ listType, kanbanDB, setOpenEditor }) {
  return (
    <Card
      className="task-list-card"
      sx={{ mr: 3, p: "20px", bgcolor: "#eee" }}
      variant="elevation"
      elevation={2}
    >
      <h3>{listType}</h3>
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
      <Button
        className="btn-add-task"
        aria-label="add a task"
        startIcon={<AddCircleOutlineIcon />}
      >
        Add a task
      </Button>
    </Card>
  );
}

export default TaskList;
