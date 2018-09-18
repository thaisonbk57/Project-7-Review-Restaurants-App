import React, {Component} from 'react';
import Restaurant from './../../components/restaurant';
import {connect} from "react-redux";


class RestaurantList extends Component {

  render() {
    return (
        <div>
          {this.props.restaurantsInRange.map(restaurant => {
              return <Restaurant 
                        key= {restaurant.place_id}
                        info={restaurant}
                        // TODO: is restaurant.place_id a string or just a non-type key ???
                        reviews={this.props.allReviews[restaurant.place_id]} />
                })}
        </div>
    );
  }
}

const mapState = state => {
  return {
    restaurantsInRange: state.restaurantsInRange,
    allReviews: state.allReviews
  }
}


export default connect(mapState)(RestaurantList);