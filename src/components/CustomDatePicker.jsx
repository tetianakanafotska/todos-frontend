import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/system";
import dayjs from "dayjs";

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontSize: "0.9rem",
    fontWeight: "500",
    padding: 0,
    "&:hover": {
      fontWeight: "600",
      transition: "color 0.1s",
    },
  },
  "& .MuiInputBase-root": {
    padding: 0,
  },
  "& fieldset": {
    border: "none",
    display: "none",
  },
  "& button": {
    display: "none",
  },
  "&.MuiFormControl-root": {
    marginBottom: 0,
    width: "95px",
  },
}));

const CustomDatePicker = ({ value, handleDateChange, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledDatePicker
      open={open}
      format="MMM D, YYYY"
      value={dayjs(value)}
      onChange={(date) => {
        handleDateChange(date);
        setOpen(false);
      }}
      onClose={() => setOpen(false)}
      slotProps={{
        textField: {
          onClick: () => setOpen(true),
          inputProps: {
            onMouseDown: (event) => event.preventDefault(),
          },
        },
      }}
      {...props}
    />
  );
};

export default CustomDatePicker;
