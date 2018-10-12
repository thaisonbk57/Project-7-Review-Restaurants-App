import React from 'react';
import './StarInput.css';

const rating = props => {
  return (
    <div className="Filter-stars">
      <input
        onChange={e => {
          props.onchange(e);
        }}
        type="radio"
        name="star-filter"
        id="star-filter-1"
        value="5"
      />
      <label htmlFor="star-filter-1" />
      <input
        onChange={e => {
          props.onchange(e);
        }}
        type="radio"
        name="star-filter"
        id="star-filter-2"
        value="4"
      />
      <label htmlFor="star-filter-2" />
      <input
        onChange={e => {
          props.onchange(e);
        }}
        type="radio"
        name="star-filter"
        id="star-filter-3"
        value="3"
      />
      <label htmlFor="star-filter-3" />
      <input
        onChange={e => {
          props.onchange(e);
        }}
        type="radio"
        name="star-filter"
        id="star-filter-4"
        value="2"
      />
      <label htmlFor="star-filter-4" />
      <input
        onChange={e => {
          props.onchange(e);
        }}
        type="radio"
        name="star-filter"
        id="star-filter-5"
        value="1"
        defaultChecked
      />
      <label htmlFor="star-filter-5" />
    </div>
  );
};

export default rating;
