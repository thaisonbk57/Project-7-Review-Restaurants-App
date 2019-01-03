import React from "react";
import "./Header.css";
import Filter from "./../../containers/Filter/Filter";

function Header(props) {
  return (
    <div className="Header clearfix py-3">
      <div className="col-md-12 col-sm-12 float-left">
        <h1 className="heading heading-primary display-3 text-center text-light">
          Where2eat
        </h1>
        <p className="text-light text-center my-0">
          <b className="text-danger">DRAG</b> to load new restaurants OR{" "}
          <b className="text-danger">RIGHT CLICK</b> to add a new one.
        </p>
      </div>
      <div className="col-md-12 col-sm-12 float-left h-100">
        <Filter />
      </div>
    </div>
  );
}

export default Header;
