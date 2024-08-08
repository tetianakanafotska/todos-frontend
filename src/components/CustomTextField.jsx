import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const CustomTextField = styled(({ ...props }) => (
  <TextField variant="outlined" fullWidth multiline size="small" {...props} />
))({
  marginBottom: "15px",
});

export default CustomTextField;
