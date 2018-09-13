import React, {Component} from "react";
import Header from "../components/header/Header";
import { connect} from "react-redux";
import {getUserPosition,getRestaurantIDs,getRestaurants} from "./../store/actions";
import gmaps from "@google/maps";
import "./App.css";

const googleMapsClient = gmaps.createClient({
    key: "AIzaSyAhqGGanA-hH9UQ1O96Y95h_kx-xfwkaU4"
});

class App extends Component {
    state = {
        currentPos: {}
    };
    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log("pos", position);
            this.setState({
                currentPos: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
            googleMapsClient.placesNearby({
                    location: position.coords,
                    radius: 5000,
                    type: "restaurant"
                },
                (err, res) => {
                    if (!err) {
                        console.log("places", res.json.results);
                    } else {
                        console.log("Error", err);
                    }
                }
            );
        });
    };
    render() {
        console.log("currentPos", this.state.currentPos);
        return ( 
        <div className = "App" >
            <Header />
            <button onClick = {this.props.userPos}> User position </button>
            <button onClick = {this.props.getRestIDs}> get restaurants </button>
            <button onClick = {() => {this.props.getRes(this.props.IDs)}}>get restaurants</button>
        </div >
        );
    }
}

function mapState(state) {
    return {
        IDs: state.allRestaurantIDs
    };
}

function mapDispatch(dispatch) {
    return {
        userPos: () => {
            dispatch(getUserPosition());
        },
        getRestIDs: () => {
            dispatch(getRestaurantIDs(this.state.currentPos, 2000));
        },
        getRes: IDs => {
            dispatch(getRestaurants(IDs));
        }
    };
}

export default connect(
    mapState,
    mapDispatch
)(App);