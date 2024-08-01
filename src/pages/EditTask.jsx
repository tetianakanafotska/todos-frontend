import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskModal from "@components/TaskModal";
import CloseIcon from "@mui/icons-material/Close";
import tasksService from "@services/task.service";
import { UserContext } from "@context/userContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { IconButton, Button } from "@mui/material";

function EditTask({ allTasks, setAllTasks, withEditTask }) {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(withEditTask);
  const navigate = useNavigate();
  const { taskId } = useParams();

  const currentTask = allTasks.find((task) => task._id === taskId);

  console.log("this is current task", currentTask);

  const [formInputs, setFormInputs] = useState({
    title: currentTask.title,
    type: currentTask.type,
    priority: currentTask.priority,
    description: currentTask.description,
    createdAt: currentTask.createdAt,
    dueAt: currentTask.dueAt,
  });

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (e) => {
    setFormInputs((prev) => ({ ...prev, dueAt: e }));
  };

  const handleSave = () => {
    tasksService
      .put(taskId, { ...formInputs, user: user._id })
      .then((updatedTask) => {
        const updatedTasks = allTasks.map((task) =>
          task._id === taskId ? updatedTask.data : task
        );
        setAllTasks(updatedTasks);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = () => {
    tasksService
      .delete(taskId)
      .then(() => {
        const updatedTasks = allTasks.filter((task) => task._id != taskId);
        setAllTasks(updatedTasks);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TaskModal
          formInputs={formInputs}
          handleOnChange={handleOnChange}
          handleDateChange={handleDateChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
        <Button onClick={handleDelete} variant="outlined">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTask;
