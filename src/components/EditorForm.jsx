import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import SubjectIcon from "@mui/icons-material/Subject";
import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SubtitlesIcon from "@mui/icons-material/Subtitles";

function EditorForm({ saveEdit, deleteTask, currentTask }) {
  const [formInputs, setFormInputs] = useState({
    id: currentTask.id,
    title: currentTask.title,
    status: currentTask.status,
    priority: currentTask.priority,
    description: currentTask.description,
    assignee: currentTask.assignee,
    createdDate: currentTask.createdDate,
    dueDate: currentTask.dueDate,
  });

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setFormInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveButton = (e) => {
    e.preventDefault();
    saveEdit(formInputs);
  };

  const handleDeleteButton = (e) => {
    e.preventDefault();
    deleteTask(currentTask.id);
  };

  return (
    <>
      <div className="main">
        <div className="leftColumn">
          <div className="title">
            <SubtitlesIcon id="title-icon" />
            <input
              id="title"
              type="text"
              value={formInputs.title}
              onChange={handleOnChange}
            />
          </div>

          <label htmlFor="description">Description</label>
          <div className="description-div">
            <SubjectIcon id="description-icon" />
            <textarea
              id="description"
              type="text"
              value={formInputs.description}
              onChange={handleOnChange}
            />
          </div>
          <label htmlFor="assignee">Assignee</label>
          <div className="assignee-div">
            <Avatar sx={{ width: 21, height: 21 }} />{" "}
            <input
              id="assignee"
              type="text"
              value={formInputs.assignee}
              onChange={handleOnChange}
            />
          </div>
          {/* due*/}
          <label htmlFor="dueDate">Due:</label>
          <div className="dueDate-div">
            <AccessTimeIcon id="dueDate-icon" sx={{ width: 23, height: 23 }} />
            <input
              id="dueDate"
              type="date"
              value={formInputs.dueDate}
              onChange={handleOnChange}
            />
          </div>

          {/* due*/}
        </div>
        <div className="rightColumn">
          {/* task type */}
          <label htmlFor="status">Task type:</label>
          <select
            name="status"
            id="status"
            value={formInputs.status}
            onChange={handleOnChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          {/* task type */}
          {/* priority */}
          <label htmlFor="priority">Set priority:</label>
          <select
            name="priority"
            id="priority"
            value={formInputs.priority}
            onChange={handleOnChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {/* priority */}
          {/* created*/}
          <label htmlFor="createdDate">Created:</label>
          <input
            id="createdDate"
            type="date"
            value={formInputs.createdDate}
            onChange={handleOnChange}
          />
          {/* created*/}
        </div>
      </div>

      <div className="editor-buttons">
        <Button
          onClick={handleSaveButton}
          variant="contained"
          //disabled={formInputs.title === ""}
        >
          Save
        </Button>
        <Button onClick={handleDeleteButton} variant="outlined">
          Delete
        </Button>
      </div>
    </>
  );
}

export default EditorForm;
