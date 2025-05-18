import React from "react";
import "./Layout.module.css";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <div className=" d-flex flex-column justify-content-between min-vh-100 ">
        <Navbar></Navbar>
        <div className="container">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
