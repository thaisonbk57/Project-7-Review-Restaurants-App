import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import {connect} from 'react-redux';

const MyMapComponent = props => {

  const markers = props.restaurantsInRange.map(restaurant => {
    return <Marker position={restaurant.geometry.location} />
  });

  console.log(markers);

  return (
    <GoogleMap defaultZoom={13} defaultCenter={props.userPos}>
        <Marker position={props.userPos} />
        {markers}
    </GoogleMap>
  )
}

const mapState = state => {
  return {
    restaurantsInRange: state.restaurantsInRange,
    userPos: state.userPos
  }
};

const mapDispatch = dispatch => {
  return {

  }
};

export default connect(mapState, mapDispatch)(withScriptjs(withGoogleMap(MyMapComponent)));
