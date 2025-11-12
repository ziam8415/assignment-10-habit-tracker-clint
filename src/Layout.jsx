import React from "react";
import Navbar from "./Component/Navbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-gray-50">
        <div className="w-11/12 mx-auto ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Layout;
