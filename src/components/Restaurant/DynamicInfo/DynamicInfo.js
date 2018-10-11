import React from 'react';
import Reviews from './Reviews';
import RestaurantPhoto from './RestaurantPhoto';
import AddCommentBtn from './AddCommentBtn';
import { connect } from 'react-redux';
import { toggleCommentForm } from '../../../store/actions';

const DynamicInfo = props => {
  const { photo, reviews, reviewAddable, toggleCommentForm, place_id } = props;

  return (
    <div>
      <RestaurantPhoto restaurantPhoto={photo} />
      <Reviews reviews={reviews} />

      {/* only when the reviewAddable  attribute is true, user can add new comment to the restaurant. This value can be changed after user submit the addCommentForm */}
      {reviewAddable && (
        <AddCommentBtn openForm={toggleCommentForm} place_id={place_id} />
      )}
    </div>
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
