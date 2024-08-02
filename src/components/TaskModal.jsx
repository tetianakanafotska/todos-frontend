import React, { useState, useContext, useEffect } from "react";
import SubjectIcon from "@mui/icons-material/Subject";
import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { TextField, Box, MenuItem, Typography, Container } from "@mui/material";

function TaskModal({ formInputs, handleOnChange, handleDateChange }) {
  return (
    <>
      <Container>
        {/* title*/}
        <Box sx={{ display: "flex" }}>
          <SubtitlesIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="title"
            label="Title"
            variant="standard"
            value={formInputs.title}
            onChange={handleOnChange}
            fullWidth
          />
        </Box>
        {/* description*/}
        <Box sx={{ display: "flex" }}>
          <SubjectIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="description"
            label="Description"
            variant="standard"
            value={formInputs.description}
            onChange={handleOnChange}
            fullWidth
            multiline
            rows={3}
          />
        </Box>

        {/* priority*/}
        <TextField
          id="priority"
          select
          label="priority"
          defaultValue="Low"
          helperText="Please select your priority"
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
        {/* due*/}
        <DatePicker
          label="Due"
          value={dayjs(formInputs.dueAt)}
          onChange={handleDateChange}
          disablePast
        />
        {/* createdAt*/}
        <DatePicker
          label="Created at"
          defaultValue={dayjs(formInputs.createdAt)}
          readOnly
        />
      </Container>
    </>
  );
}

export default TaskModal;
