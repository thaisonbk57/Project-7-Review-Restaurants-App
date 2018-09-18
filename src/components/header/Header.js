import React from "react";
import "./Header.css";
import Heading from "./heading/Heading";
import Filter from "./../../containers/filter/filter";


function header(props) {
  return(
    <div className="Header clearfix bg-warning py-3">
      <div className="col-9 float-left">
        <Heading heading="Restaurants Review" />
      </div>
      <div className="col-3 float-left h-100">
        <Filter />
      </div>
    </div>
  );
}

export default header;
