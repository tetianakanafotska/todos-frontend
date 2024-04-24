import React from "react";
import { Card } from "@mui/material";
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
    </Card>
  );
}

export default TaskList;
