import React from "react";
import {renderStars} from "./../../../../utilities/ultilities";

const reviewRating = props => {
  return (
    <p className="review--rating text-warning">
      {renderStar(props.reviewRating)}
    </p>
  );
}
export default reviewRating;