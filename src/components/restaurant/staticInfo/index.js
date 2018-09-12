import React from "react";
import RestaurantName from "./restaurant_name";
import RestaurantRating from "./restaurant_rating";
import RestaurantAddress from "./restaurant_address";


function RestaurantInfo(props) {
  return(
    <div className="staticInfo">
      <RestaurantName />
      <RestaurantRating />
      <RestaurantAddress />
    </div>
  );
}

export default RestaurantInfo;