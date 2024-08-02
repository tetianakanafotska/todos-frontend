import { useNavigate, useParams } from "react-router-dom";
import TaskModal from "@components/TaskModal";
import tasksService from "@services/task.service";
import { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "@context/userContext";
import dayjs from "dayjs";

import { IconButton } from "@mui/material";

function AddTask({ setAllTasks, open, setOpen }) {
  const navigate = useNavigate();
  const { taskType } = useParams();
  const { user } = useContext(UserContext);

  const [formInputs, setFormInputs] = useState({
    title: "",
    type: taskType,
    priority: "Low",
    description: "",
    createdAt: dayjs(),
    dueAt: dayjs().add(1, "day"),
  });

  useEffect(() => {
    if (user) {
      setFormInputs((prev) => ({
        ...prev,
        userId: user._id,
      }));
    }
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    console.log("this is due at", newDate);
    setFormInputs((prev) => ({ ...prev, dueAt: newDate }));
  };

  const saveTask = (formInputs) => {
    console.log("this is what does to the db", formInputs);
    console.log(
      "this is type of dates",
      typeof formInputs.createdAt,
      typeof formInputs.dueAt
    );
    tasksService.getByType(formInputs.type).then((tasksOfType) => {
      const maxIndex = Math.max(
        ...tasksOfType.data.map((task) => task.position),
        0
      );
      const nextIndex = tasksOfType.data.length === 0 ? 1 : maxIndex + 1;
      tasksService
        .post({ ...formInputs, position: nextIndex })
        .then((savedTask) => {
          console.log("this is what comes or of db", savedTask.data);
          console.log(
            "this is type of dates",
            typeof savedTask.data.createdAt,
            typeof savedTask.data.dueAt
          );
          setAllTasks((prev) => [...prev, savedTask.data]);
          setOpen(false);
          navigate("/");
        });
    });
  };

  const handleSaveButton = (e) => {
    e.preventDefault();
    saveTask(formInputs);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create a new task</DialogTitle>

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
        <Button
          onClick={handleSaveButton}
          variant="contained"
          disabled={formInputs.title === ""}
        >
          Save
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTask;
