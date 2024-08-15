import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskEditModal from "@components/TaskEditModal";
import CloseIcon from "@mui/icons-material/Close";
import tasksService from "@services/task.service";
import { UserContext } from "@context/userContext";
import { useTasks } from "@context/taskContext.jsx";
import {
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

function EditTask({ open, setOpen }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { tasks, setTasks, fetchTasks } = useTasks();
  const [deleting, setDeleting] = useState(false);

  const findTaskById = (taskId) => {
    return tasks.find((task) => task._id === taskId);
  };

  const currentTask = findTaskById(taskId);

  const [formInputs, setFormInputs] = useState({
    title: "",
    type: "",
    priority: "",
    description: "",
    position: "",
    createdAt: "",
    dueAt: "",
  });

  useEffect(() => {
    if (currentTask) {
      setFormInputs({
        title: currentTask.title,
        type: currentTask.type,
        priority: currentTask.priority,
        description: currentTask.description,
        position: currentTask.position,
        createdAt: currentTask.createdAt,
        dueAt: currentTask.dueAt,
      });
    }
  }, [currentTask]);

  const handleSave = async () => {
    try {
      const updatedTask = tasks.map((task) =>
        task._id === taskId ? { ...task, ...formInputs } : task
      );
      setTasks(updatedTask);
      setOpen(false);
      navigate("/dashboard");
      await tasksService.put(taskId, {
        ...formInputs,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await tasksService.delete(taskId);
      const updatedTasks = tasks.filter((task) => task._id != taskId);
      setTasks(updatedTasks);
      setOpen(false);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/dashboard");
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
        <TaskEditModal formInputs={formInputs} setFormInputs={setFormInputs} />
        <DialogActions>
          <Button
            onClick={handleSave}
            variant="contained"
            color="black"
            disabled={formInputs.title === ""}
          >
            Save
          </Button>
          <Button
            onClick={handleDelete}
            variant="outlined"
            color="black"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default EditTask;
