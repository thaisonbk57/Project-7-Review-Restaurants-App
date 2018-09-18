import React from "react";
import ReviewAuthor from "./reviewAuthor";
import ReviewRating from "./reviewRating";
import ReviewText from "./reviewText";

const review = props => {
  return (
    <div className="review border px-3">
      <ReviewAuthor reviewAuthor={props.reviewAuthor} />
      <ReviewRating reviewRating={props.reviewRating} />
      <ReviewText reviewText={props.reviewText} />
    </div>
  );
}
export default review;