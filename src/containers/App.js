import React, {Component} from "react";
import Header from "../components/header/Header";
import RestaurantList from "./restaurantList/restaurantList";
import { connect} from "react-redux";
import {saveRestaurantIDs,saveRestaurant, saveUserPosition, filterRestaurants} from "./../store/actions";
import gmaps from "@google/maps";
import "./App.css";
import {API_KEY} from "./../store/actions";
import AddCommentForm from "./addCommentForm/index";

const TEMP_API_KEY = "AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs";

const googleMapsClient = gmaps.createClient({
    key: TEMP_API_KEY
});


class App extends Component {
    componentDidMount = () => {
        const option = {
            enableHighAccuracy: true,
            maximunAge: 30000,
            timeout: 30000
        };
        const err = () => {
            window.alert("Oops. Something went wrong!");
        };
        if (window.navigator.geolocation) {
            /* Geolocation is supported */
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    let lat = position.coords.latitude;
                    let lng = position.coords.longitude;
                    let pos = {
                        lat: lat,
                        lng: lng
                    };
                    this.props.saveUserPos(pos);
                    // this.props.getRestIDs(this.props.userPos, 2000);

                    // get Information from google API using @google/maps package
                    googleMapsClient.placesNearby({
                        location: this.props.userPos,
                        radius: 3000,
                        type: "restaurant"
                    },(err, response) => {
                        if (!err) {
                            let data = response.json.results;
                            // console.log(data);
                            let restaurantIDs = data.map(restaurant => restaurant.place_id);
                            // console.log(restaurantIDs);
                            this.props.saveRestaurantIDs(restaurantIDs);
                            // So, now we have all IDs from restaurants that we want. Next thing to do is how to fetch restaurant details of each one and then update the store
                            // console.log(this.props.allRestaurantIDs);
                            this.props.allRestaurantIDs.forEach(ID => {
                                googleMapsClient.place({
                                    placeid: ID
                                    }, (err, response) => {
                                        if (!err) {
                                            const result = response.json.result;
                                            const {formatted_address, formatted_phonenumber, geometry, name, place_id,rating,reviews} = result;
                                            const restaurant = {formatted_address, formatted_phonenumber, geometry, name, place_id,rating,reviews};

                                            this.props.saveRestaurant(restaurant);
                                            // by default, it will take all 
                                            this.props.filterRestaurants(this.props.filterObject);
                                    } else {
                                        console.log(err);
                                    }
                                });
                            })
                        } else {
                            console.log("ERROR", err)
                        }
                    })
                },
                err,
                option
            );
        } else {
            /* Geolocation not supported. */
            window.alert("Your device is not supported.");
        }
    };
    
    render() {
        return ( 
        <div className = "App container my-3 border border-success p-0">
            <div className="row">
                <div className="col-12">
                    <Header />
                </div>
            </div>
            <div className="row">
                <div className="col-9">
                    This is for the map
                </div>
                <div className="col-3">
                    <RestaurantList />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <AddCommentForm />
                </div>
            </div>
        </div>);
    }
}

function mapState(state) {
    return {
        userPos: state.userPos,
        allRestaurantIDs: state.allRestaurantIDs,
        filterObject: state.filterObject
    };
}

function mapDispatch(dispatch) {
    return {
        saveRestaurant: restaurant => {
            dispatch(saveRestaurant(restaurant));
        },
        saveUserPos: (pos) => {
            dispatch(saveUserPosition(pos));
        },
        saveRestaurantIDs: (IDs) => {
            dispatch(saveRestaurantIDs(IDs))
        },
        filterRestaurants: (filterObject) => {
            dispatch(filterRestaurants(filterObject))
        }
    };
}

export default connect(mapState,mapDispatch)(App);