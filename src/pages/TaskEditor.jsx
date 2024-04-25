import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditorForm from "../components/EditorForm";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function TaskEditor({ kanbanDB, setKanbanDB, setOpenEditor }) {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const currentTask = kanbanDB.find((task) => {
    return task.id == taskId;
  });

  const saveEdit = (formInputs) => {
    const updatedDB = kanbanDB.map((task) => {
      return task.id === formInputs.id ? formInputs : task;
    });
    setKanbanDB(updatedDB);
    localStorage.setItem("kanbanDB", JSON.stringify(updatedDB));
    setOpenEditor(false);
    navigate("/");
  };

  const deleteTask = (id) => {
    const updatedKanbanDB = kanbanDB.filter((task) => {
      return task.id != id;
    });
    setKanbanDB(updatedKanbanDB);
    localStorage.setItem("kanbanDB", JSON.stringify(updatedKanbanDB));
    setOpenEditor(false);
    navigate("/");
  };

  return (
    <article className="task-editor-background">
      <form className="task-editor-form" action="">
        <Button
          id="btn-close-editor"
          sx={{ minWidth: "30px", borderRadius: "20px" }}
          className="btn-close-editor"
          onClick={() => {
            navigate("/");
            setOpenEditor(false);
          }}
        >
          <CloseIcon />
        </Button>
        <EditorForm
          currentTask={currentTask}
          saveEdit={saveEdit}
          deleteTask={deleteTask}
          setOpenEditor={setOpenEditor}
        />
      </form>
    </article>
  );
}

export default TaskEditor;
