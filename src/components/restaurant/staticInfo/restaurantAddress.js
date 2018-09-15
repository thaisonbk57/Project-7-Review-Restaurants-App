import React from "react";

function restaurantAddress(props){
  return (
    <p className="restaurantAddress my-0">
      {props.restaurantAddress}
    </p>
  );
}

export default restaurantAddress;