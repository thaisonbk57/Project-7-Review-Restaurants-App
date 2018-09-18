import React from "react";

const reviewAuthor = props => {
  return (
    <p className="review--author text-capitalize font-weight-bold">
      {props.reviewAuthor}
    </p>
  );
}
export default reviewAuthor;