import React from "react";

const filterBtn = props => {
        return ( 
          <button className = "btn btn-success filterBtn" onClick={() => {
            console.log(1);
            props.filter();
            }} >
            {props.children}
          </button>);
};

export default filterBtn;