import React from "react";

function restaurantName(props) {
  return (
    <h5 className="display-5 text-uppercase">
      {props.restaurantName}
    </h5>
  )
}

export default restaurantName;