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

function EditTask({ allTasks, setAllTasks, open, setOpen }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { taskId } = useParams();

  const currentTask = allTasks.find((task) => task._id === taskId);

  const [formInputs, setFormInputs] = useState({
    title: currentTask.title,
    type: currentTask.type,
    priority: currentTask.priority,
    description: currentTask.description,
    createdAt: currentTask.createdAt,
    dueAt: currentTask.dueAt,
  });

  const handleSave = () => {
    tasksService
      .put(taskId, { ...formInputs, user: user._id })
      .then((updatedTask) => {
        const updatedTasks = allTasks.map((task) =>
          task._id === taskId ? updatedTask.data : task
        );
        setAllTasks(updatedTasks);
        setOpen(false);
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
        setOpen(false);
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
      <DialogContent sx={{ p: "30px 10px 15px", mt: "20px" }}>
        <TaskModal formInputs={formInputs} setFormInputs={setFormInputs} />
        <DialogActions>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={formInputs.title === ""}
          >
            Save
          </Button>
          <Button onClick={handleDelete} variant="outlined">
            Delete
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default EditTask;
