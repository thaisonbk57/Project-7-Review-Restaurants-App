import React from "react";

const reviewText = props => {
  return (
    <p className="review--text text-justify">
      {props.reviewText}
    </p>
  );
}
export default reviewText;