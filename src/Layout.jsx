import React from "react";
import Navbar from "./Component/Navbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="w-11/12 mx-auto border">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
