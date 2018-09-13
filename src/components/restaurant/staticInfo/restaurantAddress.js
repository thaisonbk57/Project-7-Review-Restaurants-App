import React from "react";

function restaurantAddress(props){
  return (
    <p className="restaurantAddress">
      {props.restaurantAddress}
    </p>
  );
}

export default restaurantAddress;