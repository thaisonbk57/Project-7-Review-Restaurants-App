import React from "react";

const comment = props => {
  return (
    <textarea 
      className="form-control" 
      name="comment_text"
      onChange={(e) => {props.onchange(e)}}></textarea>
    );
}
export default comment;