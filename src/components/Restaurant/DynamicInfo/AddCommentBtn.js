import React from 'react';

const AddCommentBtn = props => {
  const { place_id, openForm } = props;
  return (
    <button
      id={place_id}
      onClick={() => {
        openForm(place_id);
      }}
      className="btn d-inline-block m-2 btn-warning btn-sm text-uppercase"
    >
      add comment
    </button>
  );
};

export default AddCommentBtn;
