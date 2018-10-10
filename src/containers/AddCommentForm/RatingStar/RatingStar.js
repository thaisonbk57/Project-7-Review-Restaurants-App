import React from 'react';
import './RatingStar.css';

const rating = props => {
  const { onchange } = props;

  return (
    <form className="Rating-stars">
      <input
        onChange={e => {
          onchange(e);
        }}
        type="radio"
        name="star"
        id="star1"
        value="5"
        defaultChecked
      />
      <label htmlFor="star1" />
      <input
        onChange={e => {
          onchange(e);
        }}
        type="radio"
        name="star"
        id="star2"
        value="4"
      />
      <label htmlFor="star2" />
      <input
        onChange={e => {
          onchange(e);
        }}
        type="radio"
        name="star"
        id="star3"
        value="3"
      />
      <label htmlFor="star3" />
      <input
        onChange={e => {
          onchange(e);
        }}
        type="radio"
        name="star"
        id="star4"
        value="2"
      />
      <label htmlFor="star4" />
      <input
        onChange={e => {
          onchange(e);
        }}
        type="radio"
        name="star"
        id="star5"
        value="1"
      />
      <label htmlFor="star5" />
    </form>
  );
};

export default rating;
