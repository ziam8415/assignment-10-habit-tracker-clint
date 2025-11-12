import React from "react";
import Navbar from "./Component/Navbar";
import { Outlet } from "react-router";
import Footer from "./Component/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-gray-50">
        <div className="w-11/12 mx-auto ">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
