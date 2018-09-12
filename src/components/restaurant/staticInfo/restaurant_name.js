import React from "react";

function restaurantName(props) {
  return (
    <h4 className="display-5 text-uppercase">
      {props.restaurantName}
    </h4>
  )
}

export default restaurantName;