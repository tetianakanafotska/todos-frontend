import { useNavigate } from "react-router-dom";
import EditorForm from "@components/EditorForm";
import tasksService from "@services/task.service";
import { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "@context/userContext";

import { IconButton } from "@mui/material";

function AddTask({ setAllTasks, withAddTask }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(withAddTask);

  const [formInputs, setFormInputs] = useState({
    title: "",
    type: "toDo",
    priority: "Low",
    description: "",
    createdAt: new Date().toISOString().slice(0, 10),
    dueAt: "",
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
    const { id, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [id]: value }));
  };

  const saveTask = (formInputs) => {
    tasksService.getByType(formInputs.type).then((tasksOfType) => {
      const maxIndex = Math.max(
        ...tasksOfType.data.map((task) => task.position),
        0
      );
      const nextIndex = tasksOfType.data.length === 0 ? 1 : maxIndex + 1;
      tasksService
        .post({ ...formInputs, position: nextIndex })
        .then((savedTask) => {
          setAllTasks((prev) => [...prev, savedTask.data]);
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
    <Dialog open={open} onClose={handleClose}>
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
        <EditorForm formInputs={formInputs} handleOnChange={handleOnChange} />
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
