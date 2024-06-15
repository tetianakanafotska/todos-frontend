import React from "react";
import { useNavigate } from "react-router-dom";
import EditorForm from "../components/EditorForm";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import tasksService from "../services/task.service";

function AddTask({ setAllTasks, setAddTask }) {
  const navigate = useNavigate();

  const newTask = {
    type: "To Do",
    title: "",
    description: "",
    priority: "Low",
    assignee: "",
    dueDate: "",
  };

  const saveTask = (formInputs) => {
    tasksService.post(formInputs).then((savedTask) => {
      setAllTasks((prev) => [...prev, savedTask.data]);
    });
    setAddTask(false);
    navigate("/");
  };

  const cancel = () => {
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

        <EditorForm newTask={newTask} saveTask={saveTask} cancel={cancel} />
      </form>
    </article>
  );
}

export default AddTask;
