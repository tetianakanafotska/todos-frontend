import React from "react";
import { Button } from "@mui/material";

const CustomButton = (props) => {
  return (
    <Button {...props} disableRipple size="large">
      {props.children}
    </Button>
  );
};

export default CustomButton;
