import React from "react";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import { InputBase } from "@mui/material";
import CustomDatePicker from "./CustomDatePicker";
import CustomTextField from "./CustomTextField";
import { Box, Container, Divider } from "@mui/material";

function TaskModal({ formInputs, setFormInputs }) {
  const handleCreatedDate = (e) => {
    setFormInputs((prev) => ({ ...prev, createdAt: e }));
  };

  const handleDueDate = (e) => {
    setFormInputs((prev) => ({ ...prev, dueAt: e }));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Container>
        <CustomTextField
          name="title"
          placeholder="Add title"
          value={formInputs.title}
          onChange={handleOnChange}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          autoFocus
        />
        <CustomTextField
          name="description"
          placeholder="Add description"
          value={formInputs.description}
          onChange={handleOnChange}
          sx={{
            "& .MuiInputBase-root": {
              typography: "subtitle2",
              fontWeight: "inherit",
              fontSize: "1rem",
            },
          }}
        />
        <Divider sx={{ mb: "12px" }} />

        {/* priority*/}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle2" sx={{ width: "7rem" }}>
            Priority
          </Typography>
          <Select
            name="priority"
            defaultValue="Low"
            value={formInputs.priority}
            onChange={handleOnChange}
            input={<InputBase sx={{ "& svg": { display: "none" } }} />}
            renderValue={(value) => <Chip value={value} label={value} />}
          >
            <Chip value="Low" label="Low" sx={{ margin: "0 9px" }} />
            <Chip value="Medium" label="Medium" />
            <Chip value="High" label="High" sx={{ margin: "0 9px" }} />
          </Select>
        </Box>

        {/* status*/}
        <Box
          sx={{ display: "flex", alignItems: "center", margin: "5px 0 9px" }}
        >
          <Typography variant="subtitle2" sx={{ width: "7rem" }}>
            Status
          </Typography>
          <Select
            name="type"
            defaultValue="toDo"
            value={formInputs.type}
            onChange={handleOnChange}
            input={<InputBase sx={{ "& svg": { display: "none" } }} />}
            renderValue={(value) => (
              <Chip
                value={value}
                label={value
                  .replace(/([A-Z])/g, " $1")
                  .replace(/\b\w/g, (char) => char.toUpperCase())
                  .trim()}
              />
            )}
          >
            <Chip value="toDo" label="To Do" sx={{ margin: "0 9px" }} />
            <Chip value="inProgress" label="In Progress" />
            <Chip value="done" label="Done" sx={{ margin: "0 9px" }} />
          </Select>
        </Box>

        {/* timeline*/}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            mb: "5px",
          }}
        >
          <Typography variant="subtitle2" sx={{ width: "7rem" }}>
            Timeline
          </Typography>
          <CustomDatePicker
            name="createdAt"
            value={dayjs(formInputs.createdAt)}
            handleDateChange={handleCreatedDate}
          />
          <span style={{ marginRight: "6px" }}>–</span>
          <CustomDatePicker
            name="dueAt"
            value={dayjs(formInputs.dueAt)}
            handleDateChange={handleDueDate}
          />
        </Box>
      </Container>
    </>
  );
}

export default TaskModal;
