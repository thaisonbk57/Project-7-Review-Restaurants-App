import React from 'react';
import './Header.css';
import Filter from './../../containers/Filter/Filter';

function Header(props) {
  return (
    <div className="Header clearfix py-3">
      <div className="col-9 float-left">
        <h1 className="heading heading-primary display-3 text-center text-light">
          Restaurant Review
        </h1>
        <p className="text-light text-center">
          <b className="text-danger">DRAG</b> to load new restaurants OR{' '}
          <b className="text-danger">RIGHT CLICK</b> to add a new one.
        </p>
      </div>
      <div className="col-3 float-left h-100">
        <Filter />
      </div>
    </div>
  );
}

export default Header;
