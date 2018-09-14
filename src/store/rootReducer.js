import {
    SAVE_USER_POSITION,
    SAVE_RESTAURANT,
    SAVE_RESTAURANT_ID
} from "./actions";


const initState = {
    allRestaurants: []
};


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
        case SAVE_RESTAURANT:
            
            return {
                ...state,
                allRestaurants: state.allRestaurants.concat([action.payload])
            }
        default:
            return state;
    }
}

