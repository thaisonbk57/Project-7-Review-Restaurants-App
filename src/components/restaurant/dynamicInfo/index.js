import React from "react";
import Reviews from "./reviews";
import RestaurantPhoto from "./restaurantPhoto";
import AddCommentBtn from "./addCommentBtn";
import {connect} from "react-redux";
import {openCommentForm} from "./../../../store/actions";

const DynamicInfo = (props) => {
  return (
    <div>
      <RestaurantPhoto restaurantPhoto={props.photo} />
      <Reviews reviews={props.reviews} />
      <div className="p-3"><AddCommentBtn openForm={props.openCommentForm} place_id={props.place_id} /></div>
    </div>
  );
}

const mapDispatch = dispatch => {
  return {
    openCommentForm: (place_id) => {dispatch(openCommentForm(place_id))}
  }
}

export default connect(null, mapDispatch)(DynamicInfo);