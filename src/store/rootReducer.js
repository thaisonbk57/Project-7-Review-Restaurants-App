import {
    SAVE_USER_POSITION,
    SAVE_RESTAURANT,
    SAVE_RESTAURANT_IDs,
    FILTER_RESTAURANTS,
    UPDATE_FILTER_OBJECT,
    OPEN_COMMENT_FORM,
    ADD_COMMENT,
    SAVE_REVIEWS,
    UPDATE_MAP_CENTER,
    UPDATE_MAP_BOUNDS
} from "./actions";


const initState = {
    allRestaurants: [],
    allReviews: {},
    mapBounds: {},
    restaurantsInRange: [],
    restaurantsInBounds: [],
    allRestaurantIDs: [],
    userPos:{},
    filterObject: { // use to filter the  restaurant in range from X stars to Y stars
        from: 1,
        to: 5
    },
    activeCommentForm: false, // if true, then the comment from will pop up.
    activeRestaurant: "", // here will be the PLACE_ID of the active restaurant that is goona receive new comment,
    mapCenter: {
        coords: {},
        place_id: '' // if user clicked on a restaurant, we compare the the clicked restaurant and the place_id to add BOUNCE anumation effect to the markers.
    },
};


export default function rootReducer(state = initState, action) {
    switch (action.type) {
        case SAVE_USER_POSITION:
        // have user's position returned from the navigatior, dispatch this action to update the store.
            return {
                ...state,
                userPos: action.payload.position,
                mapCenter: {...state.mapCenter, coords: action.payload.position} // default mapCenter is the position of User
            }
        case SAVE_RESTAURANT_IDs:
            return {
                ...state,
                allRestaurantIDs: [...state.allRestaurantIDs,...action.payload.restaurantIDs]
            }
        case SAVE_RESTAURANT:
            return {
                ...state,
                allRestaurants: [...state.allRestaurants, action.payload.restaurant]
            }
        case SAVE_REVIEWS:
            return {
                ...state,
                allReviews: {
                    ...state.allReviews,
                    [action.payload.place_id]: action.payload.reviews
                }
            }
        case FILTER_RESTAURANTS:
            const [from, to] = [action.payload.filterObject.from, action.payload.filterObject.to];
            let restaurantsInRange = state.allRestaurants.filter(restaurant => {
                return restaurant.rating >= from && restaurant.rating <= to;
            });
            return {
                ...state,
                restaurantsInRange: [...restaurantsInRange]
            }
        case UPDATE_FILTER_OBJECT:
            return {
                ...state,
                filterObject: {...state.filterObject, ...action.payload.filterObj}
            }
        case OPEN_COMMENT_FORM:
            return {
                ...state,
                activeRestaurant: action.payload.place_id,
                activeCommentForm: true
            }
        case ADD_COMMENT:
            let allReviews = {...state.allReviews};
            let id = action.payload.targetRestaurant;

            return {
                ...state,
                activeCommentForm: false,
                allReviews: {
                    ...allReviews,
                    [id]: [...allReviews[id], {...action.payload.commentObject}] 
                }
            }
        case UPDATE_MAP_CENTER:
            return {
                ...state,
                mapCenter: {...state.mapCenter,coords: {...state.mapCenter.coords, lat: action.payload.coords.lat, lng: action.payload.coords.lng}, place_id: action.payload.place_id}
            }
        case UPDATE_MAP_BOUNDS:
        return {
            ...state,
            mapBounds: action.payload.bounds
        }
        default:
            return state;
    }
}

