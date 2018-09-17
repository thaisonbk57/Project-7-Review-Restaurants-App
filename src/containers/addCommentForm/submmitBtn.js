import React from "react";

const submitBtn = props => {
  return (
    <button onClick={props.submit} className="btn btn-success btn-sm">
      Submit
    </button>
  );
}

export default submitBtn;