import React from "react";
import ReviewAuthor from "./reviewAuthor";
import ReviewRating from "./reviewRating";
import ReviewText from "./reviewText";

const review = props => {
  return (
    <div className="review">
      <ReviewAuthor />
      <ReviewRating />
      <ReviewText />
    </div>
  );
}
export default review;