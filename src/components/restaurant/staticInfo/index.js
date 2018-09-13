import React from "react";
import RestaurantName from "./restaurantName";
import RestaurantRating from "./restaurantRating";
import RestaurantAddress from "./restaurantAddress";


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