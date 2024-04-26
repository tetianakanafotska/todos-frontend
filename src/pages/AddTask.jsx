import React from "react";
import { useNavigate } from "react-router-dom";
import EditorForm from "../components/EditorForm";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function AddTask({ kanbanDB, setKanbanDB, setAddTask }) {
  const navigate = useNavigate();

  const currentTask = {
    id: Date.now().toString(),
    title: "",
    status: "To Do",
    priority: "Low",
    description: "",
    assignee: "",
    createdDate: new Date().toISOString().slice(0, 10),
    dueDate: "",
  };

  const saveEdit = (formInputs) => {
    const updatedKanban = [...kanbanDB, formInputs];
    setKanbanDB(updatedKanban);
    localStorage.setItem("kanbanDB", JSON.stringify(updatedKanban));
    setAddTask(false);
    navigate("/");
  };

  const deleteTask = () => {
    //same as if cancel
    setAddTask(false);
    navigate("/");
  };

  return (
    <article className="task-editor-background">
      <form className="task-editor-form" action="">
        <div className="title">
          <h3>Create a new task</h3>
          <Button
            sx={{ minWidth: "30px", borderRadius: "20px" }}
            className="btn-close-editor"
            onClick={() => {
              navigate("/");
              setAddTask(false);
            }}
          >
            <CloseIcon />
          </Button>
        </div>

        <EditorForm
          currentTask={currentTask}
          saveEdit={saveEdit}
          setAddTask={setAddTask}
          deleteTask={deleteTask}
        />
      </form>
    </article>
  );
}

export default AddTask;
