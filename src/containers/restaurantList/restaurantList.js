import React, {Component} from 'react';
import Restaurant from './../../components/restaurant';
import {connect} from "react-redux";


class RestaurantList extends Component {
  renderRestaurants = () => {
    let List = this.props.restaurantsInRange.map(restaurant => {
      return <Restaurant 
        key= {restaurant.place_id}
        info={restaurant} />
    });
    return List;
  }

  render() {
    return (
        <div>
          {this.renderRestaurants()}
        </div>
    );
  }
}

const mapState = state => {
  return {
    restaurantsInRange: state.restaurantsInRange
  }
}


export default connect(mapState)(RestaurantList);