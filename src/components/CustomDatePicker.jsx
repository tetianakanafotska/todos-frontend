import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
              fontSize: "0.95rem",
              fontWeight: "500",
              "&:hover": { fontWeight: "600", transition: "color 0.1s" },
            },
          },
        },
      }}
      {...props}
    ></DatePicker>
  );
};

export default CustomDatePicker;
