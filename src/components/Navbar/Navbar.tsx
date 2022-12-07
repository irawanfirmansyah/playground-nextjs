import { Box, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { palette } = useTheme();
  return (
    <Box
      style={{
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: palette.primary.main,
        padding: "48px",
      }}
    >
      <Typography variant="h4">
        <Link href="/">Home</Link>
      </Typography>
      <Typography variant="h4">
        <Link href="/random-arithmetic">Random-Arithmetic</Link>
      </Typography>
      <Typography variant="h4">
        <Link href="/todos">Todos</Link>
      </Typography>
    </Box>
  );
};

export default Navbar;
