import React from "react";
import Review from "./review/index";

const reviews = props => {

  // replace the key later, instead of using index, write a function to generate the unique id
  const reviews = props.reviews.map((review, index) => {
    return <Review 
                key={review.time}
                reviewAuthor={review.author_name}
                reviewRating={review.rating}
                reviewText={review.text} />
  });

  // TODO: return a list of reviews using map function.

  return (
    <div>
      {reviews}
    </div>
  );
}

export default reviews;