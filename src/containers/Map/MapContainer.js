import React, { Component } from "react";
import MyMap from "./Map";
class Map extends Component {
  render() {
    return (
      <div>
        <MyMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={
            <div
              style={{
                height: `100%`
              }}
            />
          }
          containerElement={
            <div
              style={{
                height: `calc(100vh - 150px)`
              }}
            />
          }
          mapElement={
            <div
              style={{
                height: `100%`
              }}
            />
          }
        />
      </div>
    );
  }
}

export default Map;
