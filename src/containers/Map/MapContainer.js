import React, { Component } from "react";
import MyMap from "./Map";
import { API_KEY } from "./../App";
class Map extends Component {
  render() {
    const mapURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`;
    return (
      <div>
        <MyMap
          googleMapURL={mapURL}
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
