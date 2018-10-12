import React from 'react';
import Review from './Review/Review';

const Reviews = props => {
  const { reviews } = props;

  return (
    <div>
      {reviews.map(review => {
        const { time, author_name, rating, text } = review;

        return (
          <Review
            key={time}
            reviewAuthor={author_name}
            reviewRating={rating}
            reviewText={text}
          />
        );
      })}
    </div>
  );
};

export default Reviews;
