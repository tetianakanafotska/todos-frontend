import React from "react";
import { useNavigate } from "react-router-dom";
import EditorForm from "../components/EditorForm";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function AddTask({ kanbanDB, setKanbanDB, setAddTask }) {
  const navigate = useNavigate();

  const currentTask = {
    id: kanbanDB.length + 1,
    title: "",
    status: "To Do",
    priority: "Low",
    description: "",
    assignee: "",
    createdDate: new Date().toISOString().slice(0, 10),
    dueDate: "",
  };

  const saveEdit = (formInputs) => {
    setKanbanDB((prev) => {
      console.log(prev);
      return [...prev, formInputs];
    });
    console.log(kanbanDB);
    setAddTask(false);
    navigate("/");
  };

  return (
    <article className="task-editor-background">
      <form className="task-editor-form" action="">
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
        <EditorForm
          currentTask={currentTask}
          saveEdit={saveEdit}
          setAddTask={setAddTask}
        />
      </form>
    </article>
  );
}

export default AddTask;
