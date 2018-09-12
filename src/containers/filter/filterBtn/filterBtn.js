import React from "react";

const filterBtn = props => {
  return (
    <button className="btn btn-success filterBtn">
      {props.children}
    </button>
  );
}
export default filterBtn;