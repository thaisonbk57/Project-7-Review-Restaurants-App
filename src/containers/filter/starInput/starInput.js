import React from "react";

function StarInput(props) {
    return(
      <input 
        className="form-control badge-pill d-inline-block text-center"
        data-type={props.datatype} 
        value={props.value}
        onChange={props.onChangeHandler} 
        type="number"/>
    );
}
export default StarInput;