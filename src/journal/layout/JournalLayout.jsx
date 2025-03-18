import { Box, Toolbar } from "@mui/material";
import React from "react";
import { Navbar } from "../components/Navbar";
import { SideBar } from "../components/SideBar";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate_animated animate_fadeIn animate_faster">
      <Navbar drawerWidth={drawerWidth} />
      <SideBar drawerWith={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
