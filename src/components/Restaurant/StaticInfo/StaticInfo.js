import React from 'react';
import { renderStars } from '../../../utilities/renderStars';

function RestaurantInfo(props) {
  const {
    toggleDynamicInfo,
    restaurantAddress,
    restaurantName,
    restaurantRating
  } = props;

  return (
    <div onClick={toggleDynamicInfo} className="staticInfo p-2 border">
      <h5 className="display-5 font-weight-bold">{restaurantName}</h5>
      <div className="text-warning">
        {restaurantRating} &nbsp; {renderStars(restaurantRating)}
      </div>
      <p className="restaurantAddress my-0">{restaurantAddress}</p>
    </div>
  );
}

export default RestaurantInfo;