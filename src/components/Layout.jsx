import React, { useState } from "react";
import { Navbar, Sidebar } from "@components";

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {children}
    </>
  );
}

export default Layout;
