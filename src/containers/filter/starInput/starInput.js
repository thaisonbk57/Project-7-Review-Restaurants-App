import React from "react";
import "./starInput.css";

const rating = props => {
  return (
        <div className="Filter-stars">
          <input onChange={(e) => {props.onchange(e)}} type="radio" name="star-filter" id="star-filter-1" value="5" />
          <label htmlFor="star-filter-1"></label>
          <input onChange={(e) => {props.onchange(e)}} type="radio" name="star-filter" id="star-filter-2" value="4" />
          <label htmlFor="star-filter-2"></label>
          <input onChange={(e) => {props.onchange(e)}} type="radio" name="star-filter" id="star-filter-3" value="3" />
          <label htmlFor="star-filter-3"></label>
          <input onChange={(e) => {props.onchange(e)}} type="radio" name="star-filter" id="star-filter-4" value="2" />
          <label htmlFor="star-filter-4"></label>
          <input onChange={(e) => {props.onchange(e)}} type="radio" name="star-filter" id="star-filter-5" value="1" />
          <label htmlFor="star-filter-5"></label>
        </div>
  );
}

export default rating;