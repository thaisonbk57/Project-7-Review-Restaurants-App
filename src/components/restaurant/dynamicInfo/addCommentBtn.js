import React from "react";

const addCommentBtn = props => {
  return (
    <button 
          id={props.place_id} 
          onClick={() => {props.openForm(props.place_id)}} 
          className="btn btn-warning btn-sm text-uppercase">
      add comment    
    </button>
  );
}

export default addCommentBtn;