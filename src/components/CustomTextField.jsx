import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const CustomTextField = styled(({ ...props }) => (
  <TextField variant="standard" fullWidth multiline maxRows={3} {...props} />
))({
  marginBottom: "10px",
  "& .MuiInput-underline::before": {
    borderBottom: "none",
  },
  "& .MuiInput-underline::after": {
    borderBottom: "1px solid black",
  },
  "& .MuiInput-underline:hover::before": {
    borderBottom: "none",
  },
});
export default CustomTextField;
