export const API_KEY = "AIzaSyAhqGGanA-hH9UQ1O96Y95h_kx-xfwkaU4";
export const BASE_URL = "https://maps.googleapis.com/maps/api/";

export const SAVE_USER_POSITION = "SAVE_USER_POSITION";
export const SAVE_RESTAURANT = "SAVE_RESTAURANT";
export const SAVE_REVIEWS = "SAVE_REVIEWS";
export const SAVE_RESTAURANT_IDs = "SAVE_RESTAURANT_ID";
export const FILTER_RESTAURANTS = "FILTER_RESTAURANT";
export const UPDATE_FILTER_OBJECT = "UPDATE_FILTER_OBJECT";
export const TOGGLE_COMMENT_FORM = "TOGGLE_COMMENT_FORM";
export const TOGGLE_ADD_RESTAURANT_FORM = "TOGGLE_ADD_RESTAURANT_FORM";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_MAP_CENTER = "UPDATE_MAP_CENTER";
export const UPDATE_MAP_BOUNDS = "UPDATE_MAP_BOUNDS";
export const UPDATE_RESTAURANTS_IN_BOUNDS = "UPDATE_RESTAURANTS_IN_BOUNDS";
export const TURN_OFF_ADD_COMMENT_BUTTON = "TURN_OFF_ADD_COMMENT_BUTTON";
export const GET_NEW_RESTAURANT_LOCATION = "GET_NEW_RESTAURANT_LOCATION";
export const INITIALIZE_REVIEWS_FOR_NEW_RESTAURANT =
  "INITIALIZE_REVIEWS_FOR_NEW_RESTAURANT";
export const UPDATE_LOCAL_STORAGE = "UPDATE_LOCAL_STORAGE";

// SAVE user' position.
export const saveUserPosition = position => {
  // @position : Object
  return {
    type: SAVE_USER_POSITION,
    payload: { position }
  };
};

// SAVE restaurant IDs (place_id)
export const saveRestaurantIDs = restaurantIDs => {
  // @restaurantIDs : Array
  return {
    type: SAVE_RESTAURANT_IDs,
    payload: { restaurantIDs }
  };
};

// FILTER out restaurants that are not in range (from X stars to Y stars)
export const filterRestaurants = (filterObject, bounds) => {
  // @ filterObject : Object
  return {
    type: FILTER_RESTAURANTS,
    payload: { filterObject, bounds }
  };
};

// SAVE restaurant details returned from google place detail API and update the store
export const saveRestaurant = restaurant => {
  // @ restaurant : Object
  return {
    type: SAVE_RESTAURANT,
    payload: { restaurant }
  };
};

// SAVE review separated, because we dont want to have too much nested array / objects in our rootReducer.
export const saveReviews = (place_id, reviews) => {
  // @place_id : string
  // @reviews : array
  return {
    type: SAVE_REVIEWS,
    payload: {
      place_id,
      reviews
    }
  };
};

export const updateFilterObject = filterObj => {
  // @filterObj : Object
  return {
    type: UPDATE_FILTER_OBJECT,
    payload: { filterObj }
  };
};

export const toggleCommentForm = place_id => {
  // @place_id : String
  return {
    type: TOGGLE_COMMENT_FORM,
    payload: { place_id }
  };
};

export const toggleAddRestaurantForm = () => {
  return {
    type: TOGGLE_ADD_RESTAURANT_FORM
  };
};

// Add comment action
export const addComment = (commentObject, targetRestaurant) => {
  // @commentObject : Object
  // @targetRestaurant : String : place_id
  return {
    type: ADD_COMMENT,
    payload: {
      commentObject,
      targetRestaurant
    }
  };
};

// update the mapCenter
export const updateMapCenter = (coords, place_id) => ({
  // @coords : Object : lat, lng : Number
  // @place_id : String
  type: UPDATE_MAP_CENTER,
  payload: {
    coords,
    place_id
  }
});

export const updateMapBounds = bounds => ({
  // @bounds : Object
  type: UPDATE_MAP_BOUNDS,
  payload: {
    bounds
  }
});

export const updateRestaurantsInBounds = bounds => {
  return {
    type: UPDATE_RESTAURANTS_IN_BOUNDS,
    payload: {}
  };
};

export const turnOffAddCommentButton = targetRestaurant => {
  // @targetRestaurant : String
  return {
    type: TURN_OFF_ADD_COMMENT_BUTTON,
    payload: {
      targetRestaurant
    }
  };
};

export const getNewRestaurantLocation = location => {
  // @location : Object : lat,lng: String
  return {
    type: GET_NEW_RESTAURANT_LOCATION,
    payload: {
      location
    }
  };
};

export const initializeReviewsForNewRestaurant = place_id => {
  // @place_id: String
  return {
    type: INITIALIZE_REVIEWS_FOR_NEW_RESTAURANT,
    payload: {
      place_id
    }
  };
};

export const updateLocalStorage = currentState => {
  return {
    type: UPDATE_LOCAL_STORAGE,
    payload: {
      currentState
    }
  };
};
