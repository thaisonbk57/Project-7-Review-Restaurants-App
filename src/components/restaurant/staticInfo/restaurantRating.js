import React from "react";
import {renderStars} from "../../../utilities/ultilities";

// function renderStar take a float number as input and return a string representing rating stars of a restaurant.

function restaurantRating(props){
  const rating = props.restaurantRating;

  return (
    <div>
      {rating} &nbsp {renderStars(rating)}
    </div>
  );
}
export default restaurantRating;