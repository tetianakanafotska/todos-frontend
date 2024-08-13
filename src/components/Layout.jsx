import React from "react";
import { Navbar, Sidebar } from "@components";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
    </>
  );
}

export default Layout;
