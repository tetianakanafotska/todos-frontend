import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function TaskEditor({ kanbanDB, setOpenEditor }) {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const foundTask = kanbanDB.find((task) => {
    return task.id === taskId;
  });

  return (
    <article className="edit-task-page">
      <form className="edit-task" action="">
        <button
          className="btn-close-editor"
          type="button"
          onClick={() => {
            navigate("/");
            setOpenEditor(false);
          }}
        >
          Close
        </button>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" value={foundTask.title} />
        <label htmlFor="description">Description</label>
        <input id="description" type="text" value={foundTask.description} />
        <label htmlFor="assignee">Assignee</label>
        <input id="assignee" type="text" value={foundTask.assignee} />
        <label htmlFor="createdDate">Created:</label>
        <input id="createdDate" type="date" value={foundTask.createdDate} />
        <label htmlFor="dueDate">Due:</label>
        <input id="dueDate" type="date" value={foundTask.dueDate} />
        <label htmlFor="status">Select status:</label>
        <select name="status" id="status">
          <option value="toDo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <label htmlFor="priority">Select priority:</label>
        <select name="priority" id="priorityInput">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button>Change</button>
      </form>
    </article>
  );
}

export default TaskEditor;
