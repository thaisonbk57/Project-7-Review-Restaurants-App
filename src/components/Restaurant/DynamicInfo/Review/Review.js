import React from 'react';
import { renderStars } from '../../../../utils/renderStars';

const Review = props => {
  const { reviewAuthor, reviewRating, reviewText } = props;

  const style = { fontSize: '15px' };

  return (
    <div className="review border px-3" style={{ backgroundColor: '#cd6133' }}>
      <p className="review--author my-1 font-weight-bold">{reviewAuthor}</p>
      <p className="review--rating text-warning my-1">
        {renderStars(reviewRating)}
      </p>
      <p style={style} className="review--text text-justify">
        {reviewText}
      </p>
    </div>
  );
};
export default Review;
