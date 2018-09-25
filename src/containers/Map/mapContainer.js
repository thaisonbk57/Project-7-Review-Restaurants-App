import React from 'react';
import GoogleMap from './map';

class MapContainer extends React.Component {

    render(){

        return (
        <GoogleMap 
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `calc(100vh - 180px)` }} />}
            mapElement={<div style={{ height: `100%` }}
            userPos={this.props.userPos} />}
        />);
    };
}


export default MapContainer;