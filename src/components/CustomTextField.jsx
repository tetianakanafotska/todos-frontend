import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const CustomTextField = styled(({ ...props }) => (
  <TextField
    variant="standard"
    fullWidth
    multiline
    size="small"
    InputProps={{ disableUnderline: true }}
    {...props}
  />
))({
  marginBottom: "15px",
  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
    borderWidth: "1px",
  },
});

export default CustomTextField;
