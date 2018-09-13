import {
    SAVE_USER_POSITION,
    SAVE_RESTAURANTS,
    SAVE_RESTAURANT_ID
} from "./actions";


const initState = {};


export default function rootReducer(state = initState, action) {
    switch (action.type) {
        case SAVE_USER_POSITION:
            return {
                ...state,
                userPos: action.payload
            }
        case SAVE_RESTAURANT_ID:
            return {
                ...state,
                allRestaurantIDs: action.payload
            }
        case SAVE_RESTAURANTS:
            return {
                ...state,
                allRestaurants: action.payload
            }
        default:
            return state;
    }
}