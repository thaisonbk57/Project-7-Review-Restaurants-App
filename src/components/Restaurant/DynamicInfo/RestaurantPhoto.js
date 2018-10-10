import React from 'react';

const RestaurantPhoto = props => {
  const { restaurantName, restaurantPhoto } = props;

  return (
    <div className="restaurant--photo">
      <img
        className="d-block mw-100 p-2"
        src={restaurantPhoto}
        alt={'street photo of ' + restaurantName}
      />
    </div>
  );
};
export default RestaurantPhoto;
