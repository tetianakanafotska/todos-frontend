import { Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

function TaskEditor({ kanbanDB, setOpenEditor }) {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const foundTask = kanbanDB.find((task) => {
    return task.id === taskId;
  });

  return (
    <article className="task-editor-background">
      <form className="task-editor-form" action="">
        <Button
          sx={{ minWidth: "30px", borderRadius: "20px" }}
          className="btn-close-editor"
          onClick={() => {
            navigate("/");
            setOpenEditor(false);
          }}
        >
          <CloseIcon />
        </Button>
        <input id="title" type="text" value={foundTask.title} />
        <div className="double-inputs">
          <label htmlFor="status">Select status:</label>
          <select name="status" id="status" value={foundTask.status}>
            <option value="toDo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <label htmlFor="priority">Select priority:</label>
          <select name="priority" id="priorityInput" value={foundTask.priority}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <label htmlFor="description">Description</label>
        <textarea id="description" type="text" value={foundTask.description} />
        <label htmlFor="assignee">Assignee</label>
        <input id="assignee" type="text" value={foundTask.assignee} />
        <div className="double-inputs">
          <label htmlFor="createdDate">Created:</label>
          <input id="createdDate" type="date" value={foundTask.createdDate} />
          <label htmlFor="dueDate">Due:</label>
          <input id="dueDate" type="date" value={foundTask.dueDate} />
        </div>
        <Button variant="contained">Save</Button>
      </form>
    </article>
  );
}

export default TaskEditor;
