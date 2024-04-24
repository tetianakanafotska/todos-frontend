import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";

function EditorForm({ saveEdit, currentTask }) {
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
    setFormInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveButton = (e) => {
    e.preventDefault();
    saveEdit(formInputs);
  };

  return (
    <>
      <input
        id="title"
        type="text"
        value={formInputs.title}
        onChange={handleOnChange}
      />
      <div className="double-inputs">
        <label htmlFor="status">Select status:</label>
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
        <label htmlFor="priority">Select priority:</label>
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
      </div>
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        type="text"
        value={formInputs.description}
        onChange={handleOnChange}
      />
      <label htmlFor="assignee">Assignee</label>
      <input
        id="assignee"
        type="text"
        value={formInputs.assignee}
        onChange={handleOnChange}
      />
      <div className="double-inputs">
        <label htmlFor="createdDate">Created:</label>
        <input
          id="createdDate"
          type="date"
          value={formInputs.createdDate}
          onChange={handleOnChange}
        />
        <label htmlFor="dueDate">Due:</label>
        <input
          id="dueDate"
          type="date"
          value={formInputs.dueDate}
          onChange={handleOnChange}
        />
      </div>
      <Button onClick={handleSaveButton} variant="contained">
        Save
      </Button>
    </>
  );
}

export default EditorForm;
