import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ styling, ...props }) => {
  return (
    <Button
      {...props}
      disableRipple
      size="large"
      sx={{
        textTransform: "none",
        fontWeight: "600",
        p: "12px 25px",
        ...styling,
      }}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;
