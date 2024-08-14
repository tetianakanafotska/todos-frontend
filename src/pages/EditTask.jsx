import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskEditModal from "@components/TaskEditModal";
import CloseIcon from "@mui/icons-material/Close";
import tasksService from "@services/task.service";
import { UserContext } from "@context/userContext";
import {
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

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
    position: currentTask.position,
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
        navigate("/dashboard");
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
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
      });
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
          <Button onClick={handleDelete} variant="outlined" color="black">
            Delete
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default EditTask;

// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import TaskEditModal from "@components/TaskEditModal";
// import CloseIcon from "@mui/icons-material/Close";
// import tasksService from "@services/task.service";
// import { UserContext } from "@context/userContext";
// import { useTasks } from "@context/taskContext.jsx";
// import {
//   IconButton,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";

// function EditTask({ open, setOpen }) {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();
//   const { taskId } = useParams();
//   const { tasks, setTasks, fetchTasks } = useTasks();

//   const findTaskById = (taskId) => {
//     const allTasks = [
//       ...(tasks.toDo || []),
//       ...(tasks.inProgress || []),
//       ...(tasks.done || []),
//     ];
//     return allTasks.find((task) => task._id === taskId);
//   };

//   const currentTask = findTaskById(taskId);

//   const [formInputs, setFormInputs] = useState({
//     title: "",
//     type: "",
//     priority: "",
//     description: "",
//     createdAt: "",
//     dueAt: "",
//   });

//   useEffect(() => {
//     if (currentTask) {
//       setFormInputs({
//         title: currentTask.title,
//         type: currentTask.type,
//         priority: currentTask.priority,
//         description: currentTask.description,
//         createdAt: currentTask.createdAt,
//         dueAt: currentTask.dueAt,
//       });
//     }
//   }, [currentTask]);

//   const handleSave = async () => {
//     try {
//       await tasksService.put(taskId, { ...formInputs, user: user._id });
//       //await fetchTasks();
//       setTasks((prev) => ({
//         ...prev,
//         [formInputs.type]: [...prev[formInputs.type], savedTask.data],
//       }));
//       setOpen(false);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await tasksService.delete(taskId);
//       await fetchTasks();
//       setOpen(false);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     navigate("/dashboard");
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth>
//       <IconButton
//         aria-label="close"
//         onClick={handleClose}
//         sx={{
//           position: "absolute",
//           right: 8,
//           top: 8,
//         }}
//       >
//         <CloseIcon />
//       </IconButton>
//       <DialogContent sx={{ p: "30px 10px 15px", mt: "20px" }}>
//         <TaskEditModal formInputs={formInputs} setFormInputs={setFormInputs} />
//         <DialogActions>
//           <Button
//             onClick={handleSave}
//             variant="contained"
//             color="black"
//             disabled={formInputs.title === ""}
//           >
//             Save
//           </Button>
//           <Button onClick={handleDelete} variant="outlined" color="black">
//             Delete
//           </Button>
//         </DialogActions>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default EditTask;
