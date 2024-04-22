import React from "react";
import Card from "@mui/material/Card";
import { CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { Link } from "react-router-dom";

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
    <Card sx={{ mb: 2 }}>
      <div id="priority" style={{ backgroundColor: priorityColor }}></div>
      <Link to={`/${task.id}`} onClick={() => setOpenEditor(true)}>
        <EditIcon />
      </Link>
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>
        {convertDate(task.createdDate)} - {convertDate(task.dueDate)}
      </div>
      <Avatar>{convertName(task.assignee)}</Avatar>
    </Card>
  );
}

export default TaskCard;
