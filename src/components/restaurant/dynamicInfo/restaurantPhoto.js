import React from "react";

const restaurantPhoto = props => {
  return (
    <div className="restaurant--photo">
      <img className="d-block mw-100 p-2" src={props.restaurantPhoto} alt={"street photo of " + props.restaurantName} />
    </div>
  );
}
export default restaurantPhoto;