import React from "react";

const restaurantPhoto = props => {
  return (
    <div className="restaurant--photo">
      <img src={props.restaurantPhoto} alt={props.restaurantName} />
    </div>
  );
}
export default restaurantPhoto;