import React from 'react';
import './Header.css';
import Filter from './../../containers/filter/filter';

function header(props) {
  return (
    <div className="Header clearfix py-3">
      <div className="col-9 float-left">
        <h1 className="heading heading-primary display-3 text-center text-light">
          Restaurant Review
        </h1>
      </div>
      <div className="col-3 float-left h-100">
        <Filter />
      </div>
    </div>
  );
}

export default header;
