import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import {connect} from 'react-redux';

const MyMapComponent = props => (
  <GoogleMap defaultZoom={15} defaultCenter={props.userPos}>
    {props.isMarkerShown && (
      <Marker position={props.userPos} />
    )}
  </GoogleMap>
);

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
