import axios from "axios";

export const API_KEY = "AIzaSyAhqGGanA-hH9UQ1O96Y95h_kx-xfwkaU4";
export const BASE_URL = "https://maps.googleapis.com/maps/api/";

export const SAVE_USER_POSITION = "SAVE_USER_POSITION";
export const SAVE_RESTAURANT = "SAVE_RESTAURANT";
export const SAVE_RESTAURANT_ID = "SAVE_RESTAURANT_ID";

// SAVE and GET user' position.
export const saveUserPosition = position => {
    return {
        type: SAVE_USER_POSITION,
        payload: position
    };
};


// GET and SAVE restaurant IDs (place_id)
export const saveRestaurantIDs = restaurantIDs => {
    return {
        type: SAVE_RESTAURANT_ID,
        payload: restaurantIDs
    };
};

// export const getRestaurantIDs = (center, radius) => {
//     // CENTER: an object discribing the center of the map {lat, lng}
//     // RADIUS: 2000 for example
//     // this action will return an array containing all place_id of the restaurants, based on the IDs we can use place details API to get details about the restaurants.
//     return dispatch => {
//         axios.get(`${BASE_URL}place/nearbysearch/json?key=${API_KEY}&location=${center.lat},${center.lng}&radius=${radius}&type=restaurant`)
//             .then(response => response.data.results)
//             .then(results => {
//                 // the returned result is an array of restaurants that in the radius of 2km from the  center.
//                 // but the restaurant object inside the array may contain information that we dont really need. So, we need to filter those information out using map() function for arrays.
//                 let restaurantIDs = results.map(restaurant => {
//                     return restaurant.place_id;
//                 });
//                 // dispatch the action and update the store
//                 dispatch(saveRestaurantIDs(restaurantIDs));
//             });
//     };
// };

// now, we have the IDs of restaurants, we need to hook the information from Place detailts API
export const saveRestaurant = restaurant => {
    return {
        type: SAVE_RESTAURANT,
        payload: restaurant
    };
};

// export const getRestaurants = restaurantIDs => {
//     // this action creator will take the IDs array as its input and then fetch data from google Place details API and update the store.
//     return dispatch => {
//         let restaurants = restaurantIDs.map(ID => {
//             let restaurant;
//             axios.get(`${BASE_URL}place/details/json?key=${API_KEY}&place_id=${ID}&fields=name,formatted_address,geometry/location,rating,review`)
//                 .then(response => response.data.result)
//                 .then(result => {
//                     restaurant = {
//                         name: result.name,
//                         address: result.formatted_address,
//                         location: result.geometry.location,
//                         id: result.place_id,
//                         rating: result.rating,
//                         reviews: result.reviews
//                     };
//                 });
//             // console.log(restaurant);
//             return restaurant;
//         });
//         dispatch(saveRestaurant(restaurant));
//     };
// };
