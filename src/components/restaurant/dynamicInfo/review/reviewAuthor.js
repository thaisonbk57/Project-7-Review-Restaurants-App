import React from "react";

const reviewAuthor = props => {
  return (
    <p className="review--author my-0 text-uppercase font-weight-bold">
      {props.reviewAuthor}
    </p>
  );
}
export default reviewAuthor;