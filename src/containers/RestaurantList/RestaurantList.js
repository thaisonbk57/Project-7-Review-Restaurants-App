import React, { Component } from 'react';
import Restaurant from '../../components/Restaurant/Restaurant';
import { connect } from 'react-redux';
import './RestaurantList.css';

class RestaurantList extends Component {
  render() {
    let restaurantsInRange = [...this.props.restaurantsInRange];

    const { allReviews } = this.props;

    return (
      <div className="RestaurantsList bg-secondary">
        {restaurantsInRange
          .sort((a, b) => {
            return b.rating - a.rating;
          })
          .map(restaurant => {
            return (
              <Restaurant
                key={restaurant.place_id}
                info={restaurant}
                // TODO: is restaurant.place_id a string or just a non-type key ???
                reviews={allReviews[restaurant.place_id]}
              />
            );
          })}
      </div>
    );
  }
}

const mapState = state => {
  return {
    restaurantsInRange: state.restaurantsInRange,
    allReviews: state.allReviews
  };
};

export default connect(mapState)(RestaurantList);
