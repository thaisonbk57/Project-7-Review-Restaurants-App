import React from "react";
import {renderStars} from "./../../../../utilities/ultilities";

const reviewRating = props => {
  return (
    <p className="review--rating text-warning my-1">
      {renderStars(props.reviewRating)}
    </p>
  );
}
export default reviewRating;