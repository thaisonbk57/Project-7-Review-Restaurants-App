import {
    SAVE_USER_POSITION,
    SAVE_RESTAURANT,
    SAVE_RESTAURANT_IDs,
    FILTER_RESTAURANTS,
    UPDATE_FILTER_OBJECT
} from "./actions";


const initState = {
    allRestaurants: [],
    restaurantsInRange: [],
    allRestaurantIDs: [],
    userPos:{},
    filterObject: {
        from: 1,
        to: 5
    }
};


export default function rootReducer(state = initState, action) {
    switch (action.type) {
        case SAVE_USER_POSITION:
        // have user's position returned from the navigatior, dispatch this action to update the store.
            return {
                ...state,
                userPos: action.payload
            }
        case SAVE_RESTAURANT_IDs:

            return {
                ...state,
                allRestaurantIDs: action.payload
            }
        case SAVE_RESTAURANT:
            return {
                ...state,
                allRestaurants: state.allRestaurants.concat([action.payload])
            }
        case FILTER_RESTAURANTS:
            const [from, to] = [action.payload.from, action.payload.to];
            let restaurantsInRange = state.allRestaurants.filter(restaurant => {
                return restaurant.rating >= from && restaurant.rating <= to;
            });
            return {
                ...state,
                restaurantsInRange
            }
        case UPDATE_FILTER_OBJECT:
            return {
                ...state,
                filterObject: {...state.filterObject, ...action.payload}
            }
        default:
            return state;
    }
}

