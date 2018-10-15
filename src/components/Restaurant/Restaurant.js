import React from "react";
import StaticInfo from "./StaticInfo/StaticInfo";
import DynamicInfo from "./DynamicInfo/DynamicInfo";
import { API_KEY } from "../../store/actions";
import { updateMapCenter } from "../../store/actions";
import { connect } from "react-redux";

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
    const { reviews } = this.props;

    const {
      place_id,
      reviewAddable,
      formatted_address,
      name,
      rating
    } = this.props.info;

    const { lat, lng } = this.props.info.geometry.location;

    return (
      <div className="restaurant">
        <StaticInfo
          restaurantAddress={formatted_address}
          restaurantName={name}
          restaurantRating={rating}
          toggleDynamicInfo={this.toggleDynamicInfoHandler}
        />
        <DynamicInfo
          show={this.state.showDynamicInfo}
          reviews={reviews}
          place_id={place_id}
          reviewAddable={reviewAddable}
          photo={`https://maps.googleapis.com/maps/api/streetview?size=600x600&location=${lat},${lng}&key=${API_KEY}&heading=0&pitch=10`}
        />
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
