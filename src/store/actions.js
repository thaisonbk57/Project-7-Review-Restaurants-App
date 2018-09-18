export const API_KEY = "AIzaSyAhqGGanA-hH9UQ1O96Y95h_kx-xfwkaU4";
export const BASE_URL = "https://maps.googleapis.com/maps/api/";

export const SAVE_USER_POSITION = "SAVE_USER_POSITION";
export const SAVE_RESTAURANT = "SAVE_RESTAURANT";
export const SAVE_REVIEWS = "SAVE_REVIEWS";
export const SAVE_RESTAURANT_IDs = "SAVE_RESTAURANT_ID";
export const FILTER_RESTAURANTS = "FILTER_RESTAURANT";
export const UPDATE_FILTER_OBJECT = "UPDATE_FILTER_OBJECT";
export const OPEN_COMMENT_FORM = "OPEN_COMMENT_FORM";
export const ADD_COMMENT = "ADD_COMMENT";

// SAVE user' position.
export const saveUserPosition = position => {
    return {
        type: SAVE_USER_POSITION,
        payload: {position}
    };
};


// SAVE restaurant IDs (place_id)
export const saveRestaurantIDs = restaurantIDs => {
    return {
        type: SAVE_RESTAURANT_IDs,
        payload: {restaurantIDs}
    };
};

// FILTER out restaurants that are not in range (from X stars to Y stars)
export const filterRestaurants = filterObject => {
    return {
        type: FILTER_RESTAURANTS,
        payload: {filterObject}
    }
}

// SAVE restaurant details returned from google place detail API and update the store
export const saveRestaurant = restaurant => {
    return {
        type: SAVE_RESTAURANT,
        payload: {restaurant}
    };
};

// SAVE review separated, because we dont want to have too much nested array / objects in our rootReducer.
export const saveReviews = (place_id, reviews) => {
    return {
        type: SAVE_REVIEWS,
        payload: {
            place_id,
            reviews
        }
    }
}


export const updateFilterObject = filterObj => {
    return {
        type: UPDATE_FILTER_OBJECT,
        payload: {filterObj}
    }
}


export const openCommentForm = place_id => {
    return {
        type: OPEN_COMMENT_FORM,
        payload: {place_id}
    }
}

// Add comment action
export const addComment = (commentObject, targetRestaurant) => {
    return {
        type: ADD_COMMENT,
        payload: {
            commentObject,
            targetRestaurant
        }
    }
}