import React from "react";
import "./Header.css";
import Heading from "./heading/Heading";
import Filter from "./../../containers/filter/filter";
import RestaurantList from "./../../containers/restaurantList/restaurantList";


function header(props) {
  return(
    <div className="Header clearfix bg-danger">
      <div className="col-9 bg-warning float-left">
        <Heading heading="Restaurants Review" />
      </div>
      <div className="col-3 bg-primary float-left h-100">
        <Filter />
      </div>
    </div>
  );
}

export default header;
