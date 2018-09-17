import React from "react";
import Review from "./review/index";

const reviews = props => {

  // TODO: return a list of reviews using map function.

  return (
    <div>
      {props.reviews.map((review, index) => {
          return <Review 
                      key={review.time}
                      reviewAuthor={review.author_name}
                      reviewRating={review.rating}
                      reviewText={review.text} />
                })}
    </div>
  );
}

export default reviews;