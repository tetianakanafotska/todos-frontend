import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";

import { TextField, Box, MenuItem, Container } from "@mui/material";

function TaskModal({ formInputs, setFormInputs }) {
  const CustomDatePicker = ({ value, handleDateChange, ...props }) => {
    const [open, setOpen] = useState(false);
    return (
      <DatePicker
        open={open}
        value={dayjs(value)}
        onChange={(date) => {
          handleDateChange(date);
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
        slotProps={{
          textField: {
            onClick: () => setOpen(true),
            sx: {
              input: {
                "&:hover": { color: "primary.main", transition: "color 0.1s" },
              },
            },
          },
        }}
        {...props}
      ></DatePicker>
    );
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    setFormInputs((prev) => ({ ...prev, dueAt: e }));
  };

  return (
    <>
      <Container>
        {/* title*/}
        <TextField
          name="title"
          placeholder="Title"
          variant="standard"
          value={formInputs.title}
          onChange={handleOnChange}
          className="no-label"
          fullWidth
          multiline
          maxRows={3}
        />
        {/* description*/}
        <TextField
          name="description"
          placeholder="Description"
          variant="standard"
          value={formInputs.description}
          onChange={handleOnChange}
          className="no-label"
          fullWidth
          multiline
          maxRows={3}
        />

        {/* priority*/}
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Typography>Priority</Typography>
          <TextField
            name="priority"
            select
            defaultValue="Low"
            variant="standard"
            value={formInputs.priority}
            onChange={handleOnChange}
            fullWidth
          >
            <MenuItem key="low" value="Low">
              Low
            </MenuItem>
            <MenuItem key="medium" value="Medium">
              Medium
            </MenuItem>
            <MenuItem key="high" value="High">
              High
            </MenuItem>
          </TextField>
        </Box>
        {/* timeline*/}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            mb: "20px",
          }}
        >
          <Typography sx={{ mr: "10px" }}>Timeline</Typography>
          <CustomDatePicker
            name="createdAt"
            value={dayjs(formInputs.createdAt)}
            handleDateChange={handleDateChange}
          />
          <span style={{ marginRight: "6px" }}>–</span>
          <CustomDatePicker
            name="dueAt"
            value={dayjs(formInputs.dueAt)}
            handleDateChange={handleDateChange}
            disablePast
          />
        </Box>
      </Container>
    </>
  );
}

export default TaskModal;
