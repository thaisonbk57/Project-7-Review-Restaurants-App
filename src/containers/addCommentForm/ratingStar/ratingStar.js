import React from "react";
import "./ratingStar.css";

const rating = props => {
  return (
        <div className="Rating-stars">
          <input onChange={(e) => {props.onchange(e)}} type="radio" name="star" id="star1" value="5" />
          <label htmlFor="star1"></label>
          <input onChange={(e) => {props.onchange(e)}} type="radio" name="star" id="star2" value="4" />
          <label htmlFor="star2"></label>
          <input onChange={(e) => {props.onchange(e)}} type="radio" name="star" id="star3" value="3" />
          <label htmlFor="star3"></label>
          <input onChange={(e) => {props.onchange(e)}} type="radio" name="star" id="star4" value="2" />
          <label htmlFor="star4"></label>
          <input onChange={(e) => {props.onchange(e)}} type="radio" name="star" id="star5" value="1" />
          <label htmlFor="star5"></label>
        </div>
  );
}

export default rating;