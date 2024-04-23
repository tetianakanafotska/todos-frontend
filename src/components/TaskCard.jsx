import React from "react";
import Card from "@mui/material/Card";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function TaskCard({ task, setOpenEditor }) {
  const convertDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };
  const convertName = (name) => {
    const arr = name.split(" ");
    return arr[0][0] + arr[1][0];
  };

  const addPriorityColor = () => {
    if (task.priority === "High") {
      return "#F87168";
    } else if (task.priority === "Medium") return "#F6CC47";
    else return "#579DFF";
  };

  const [priorityColor] = useState(addPriorityColor);

  return (
    <Card className="task-card" sx={{ mb: 2 }}>
      <div id="priority-tag" style={{ backgroundColor: priorityColor }}></div>
      <Link
        to={`/${task.id}`}
        id="btn-edit-task"
        onClick={() => setOpenEditor(true)}
      >
        <IconButton aria-label="edit the task">
          <EditIcon sx={{ width: 20, height: 20 }} />
        </IconButton>
      </Link>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p id="task-dates">
        <AccessTimeIcon sx={{ width: "19px" }} />
        {convertDate(task.createdDate)} - {convertDate(task.dueDate)}
      </p>
      <Avatar
        id="task-card-avatar"
        sx={{ width: 35, height: 35, fontSize: 13 }}
      >
        {convertName(task.assignee)}
      </Avatar>
    </Card>
  );
}

export default TaskCard;
