import React from "react";

const reviewText = props => {
  const style = { fontSize: "16px" };
  return (
    <p style={style} className="review--text text-justify">
      {props.reviewText}
    </p>
  );
};
export default reviewText;
