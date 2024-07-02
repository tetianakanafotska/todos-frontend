import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditorForm from "@components/EditorForm";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import tasksService from "@services/task.service";

function TaskEditor({ allTasks, setAllTasks, setOpenEditor }) {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const currentTask = allTasks.find((task) => {
    return task._id == taskId;
  });

  const saveEdit = (formInputs) => {
    tasksService
      .put(taskId, formInputs)
      .then((updatedTask) => {
        const updatedTasks = allTasks.map((task) =>
          task._id === taskId ? updatedTask.data : task
        );
        setAllTasks(updatedTasks);
        setOpenEditor(false);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteTask = () => {
    tasksService
      .delete(taskId)
      .then(() => {
        const updatedTasks = allTasks.filter((task) => task._id != taskId);
        setAllTasks(updatedTasks);
        setOpenEditor(false);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <article className="task-editor-background">
      <form className="task-editor-form" action="">
        <Button
          id="btn-close-editor"
          sx={{ minWidth: "30px", minHeight: "30px", borderRadius: "20px" }}
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
