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
    setKanbanDB((prev) => {
      return prev.map((task) => {
        if (task.id == formInputs.id) {
          return formInputs;
        } else return task;
      });
    });
    setOpenEditor(false);
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
            setOpenEditor(false);
          }}
        >
          <CloseIcon />
        </Button>
        <EditorForm
          currentTask={currentTask}
          saveEdit={saveEdit}
          setOpenEditor={setOpenEditor}
        />
      </form>
    </article>
  );
}

export default TaskEditor;
