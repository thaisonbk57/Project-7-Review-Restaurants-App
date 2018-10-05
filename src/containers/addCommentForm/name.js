import React from 'react';

const name = props => {
  return (
    <input
      name="author"
      type="text"
      className="form-control"
      onChange={e => {
        props.onchange(e);
      }}
      required
    />
  );
};
export default name;
