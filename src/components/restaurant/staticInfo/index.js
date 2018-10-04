import React from 'react';
import RestaurantName from './restaurantName';
import RestaurantRating from './restaurantRating';
import RestaurantAddress from './restaurantAddress';

function RestaurantInfo(props) {
  return (
    <div onClick={props.toggleDynamicInfo} className="staticInfo p-2 border">
      <RestaurantName restaurantName={props.restaurantName} />
      <RestaurantRating restaurantRating={props.restaurantRating} />
      <RestaurantAddress restaurantAddress={props.restaurantAddress} />
    </div>
  );
}

export default RestaurantInfo;
