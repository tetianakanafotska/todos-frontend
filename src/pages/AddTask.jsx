import { useNavigate, useParams } from "react-router-dom";
import TaskEditModal from "@components/TaskEditModal";
import { useEffect, useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "@context/userContext";
import { useTasks } from "@context/taskContext.jsx";
import dayjs from "dayjs";
import tasksService from "@services/task.service";

function AddTask({ open, setOpen }) {
  const navigate = useNavigate();
  const { taskType } = useParams();
  const { user } = useContext(UserContext);
  const { tasks, setTasks } = useTasks();

  const [formInputs, setFormInputs] = useState({
    title: "",
    description: "",
    type: taskType,
    priority: "Low",
    position: "",
    createdAt: dayjs(),
    dueAt: dayjs().add(3, "day"),
  });

  useEffect(() => {
    if (user) {
      setFormInputs((prev) => ({
        ...prev,
        userId: user._id,
      }));
    }
  }, [user]);

  const saveTask = async (formInputs) => {
    try {
      const tasksOfType = tasks[formInputs.type] || [];
      const maxIndex = Math.max(...tasksOfType.map((task) => task.position), 0);
      const nextIndex = tasksOfType.length === 0 ? 1 : maxIndex + 1;
      const savedTask = await tasksService.post({
        ...formInputs,
        position: nextIndex,
      });
      setTasks((prev) => [...prev, savedTask.data]);
      setOpen(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const handleSaveButton = (e) => {
    e.preventDefault();
    saveTask(formInputs);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/dashboard");
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle
        sx={{
          padding: "25px 34px 0",
          typography: "h6",
          fontWeight: "700",
          color: "black.main",
        }}
      >
        Create a new task
      </DialogTitle>

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

      <DialogContent sx={{ p: "20px 10px 15px" }}>
        <TaskEditModal formInputs={formInputs} setFormInputs={setFormInputs} />
        <DialogActions>
          <Button
            onClick={handleSaveButton}
            variant="contained"
            disabled={formInputs.title === ""}
            color="black"
          >
            Save
          </Button>
          <Button onClick={handleClose} variant="outlined" color="black">
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default AddTask;
