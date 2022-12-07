import { Box } from "@mui/material";
import React from "react";

const FullClientHeight = ({ children }: { children?: React.ReactNode }) => {
  return <Box height={"100vh"}>{children}</Box>;
};

export default FullClientHeight;
