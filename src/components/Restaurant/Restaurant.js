import React from 'react';
import StaticInfo from './StaticInfo/StaticInfo';
import DynamicInfo from './DynamicInfo/DynamicInfo';
import { API_KEY } from '../../store/actions';
import { updateMapCenter } from '../../store/actions';
import { connect } from 'react-redux';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDynamicInfo: false
    };
  }

  toggleDynamicInfoHandler = e => {
    this.props.updateMapCenter(
      this.props.info.geometry.location,
      this.props.info.place_id
    );
    this.setState((prevState, props) => {
      return {
        showDynamicInfo: !prevState.showDynamicInfo
      };
    });
  };

  render() {
    let dynamicInfo = null;

    const { reviews } = this.props;

    const {
      place_id,
      reviewAddable,
      formatted_address,
      name,
      rating
    } = this.props.info;

    const { lat, lng } = this.props.info.geometry.location;

    if (this.state.showDynamicInfo) {
      dynamicInfo = (
        <DynamicInfo
          reviews={reviews}
          place_id={place_id}
          reviewAddable={reviewAddable}
          photo={`https://maps.googleapis.com/maps/api/streetview?size=600x600&location=${lat},${lng}&key=${API_KEY}&fov=90&heading=235&pitch=10`}
        />
      );
    }

    return (
      <div className="restaurant">
        <StaticInfo
          restaurantAddress={formatted_address}
          restaurantName={name}
          restaurantRating={rating}
          toggleDynamicInfo={this.toggleDynamicInfoHandler}
        />
        {dynamicInfo}
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    updateMapCenter: (coords, place_id) => {
      dispatch(updateMapCenter(coords, place_id));
    }
  };
};

export default connect(
  null,
  mapDispatch
)(Restaurant);
