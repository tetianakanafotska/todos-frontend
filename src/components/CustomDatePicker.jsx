import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const CustomDatePicker = ({ value, handleDateChange, ...props }) => {
  const [open, setOpen] = useState(false);
  return (
    <DatePicker
      open={open}
      format="MMM D, YYYY"
      className="no-border"
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
              fontSize: "0.9rem",
              fontWeight: "500",
              "&:hover": { fontWeight: "600", transition: "color 0.1s" },
            },
          },
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
