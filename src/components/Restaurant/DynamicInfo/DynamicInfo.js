import React from "react";
import Reviews from "./Reviews";
import RestaurantPhoto from "./RestaurantPhoto";
import AddCommentBtn from "./AddCommentBtn";
import { connect } from "react-redux";
import { toggleCommentForm } from "../../../store/actions";
import Transition from "react-transition-group/Transition";
import "./DynamicInfo.css";

const DynamicInfo = props => {
  const {
    photo,
    reviews,
    reviewAddable,
    toggleCommentForm,
    place_id,
    show
  } = props;

  return (
    <Transition mountOnEnter unmountOnExit in={show} timeout={400}>
      {state => {
        const cssClasses = [
          "DynamicInfo",
          state === "entering"
            ? "DynamicInfoOpen"
            : state === "exiting"
              ? "DynamicInfoClosed"
              : null
        ];
        return (
          <div className={cssClasses.join(" ")}>
            <RestaurantPhoto restaurantPhoto={photo} />
            <Reviews reviews={reviews} />

            {/* only when the reviewAddable  attribute is true, user can add new comment to the restaurant. This value can be changed after user submit the addCommentForm */}
            {reviewAddable && (
              <AddCommentBtn openForm={toggleCommentForm} place_id={place_id} />
            )}
          </div>
        );
      }}
    </Transition>
  );
};

const mapDispatch = dispatch => {
  return {
    toggleCommentForm: place_id => {
      dispatch(toggleCommentForm(place_id));
    }
  };
};

export default connect(
  null,
  mapDispatch
)(DynamicInfo);
