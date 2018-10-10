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
  UPDATE_MAP_BOUNDS,
  CLOSE_COMMENT_FORM,
  TURN_OFF_ADD_COMMENT_BUTTON,
  UPDATE_MAP_CENTER_FOR_FETCHING_RESTAURANTS,
  TOGGLE_ADD_RESTAURANT_FORM,
  GET_NEW_RESTAURANT_LOCATION,
  INITIALIZE_REVIEWS_FOR_NEW_RESTAURANT
} from './actions';

const initState = {
  allRestaurants: [],
  allReviews: {},
  mapBounds: {},
  restaurantsInRange: [],
  restaurantsInBounds: [],
  allRestaurantIDs: [],
  userPos: {},
  filterObject: {
    // use to filter the  restaurant in range from X stars to Y stars
    from: 1,
    to: 5
  },
  activeCommentForm: false, // if true, then the comment from will pop up.
  activeAddRestaurantForm: false,
  activeRestaurant: '', // here will be the PLACE_ID of the active restaurant that is goona receive new comment,
  mapCenter: {
    coords: {},
    place_id: '' // if user clicked on a restaurant, we compare the the clicked restaurant and the place_id to add BOUNCE animation effect to the markers.
  },
  mapCenterForFetchingRestaurants: {},
  newRestaurantLocation: null
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case SAVE_USER_POSITION:
      // have user's position returned from the navigatior, dispatch this action to update the store.
      return {
        ...state,
        userPos: action.payload.position,
        mapCenter: { ...state.mapCenter, coords: action.payload.position } // default mapCenter is the position of User
      };
    case SAVE_RESTAURANT_IDs:
      // the map loads new places, but we will keep only the new restaurant IDs to add to the database.
      let newRestaurantIDs = action.payload.restaurantIDs.filter(
        ID => state.allRestaurantIDs.indexOf(ID) === -1
      );

      return {
        ...state,
        allRestaurantIDs: [...state.allRestaurantIDs, ...newRestaurantIDs]
      };
    case SAVE_RESTAURANT:
      return {
        ...state,
        allRestaurants: [...state.allRestaurants, action.payload.restaurant]
      };
    case SAVE_REVIEWS:
      return {
        ...state,
        allReviews: {
          ...state.allReviews,
          [action.payload.place_id]: action.payload.reviews
        }
      };
    case FILTER_RESTAURANTS:
      const [from, to] = [
        action.payload.filterObject.from,
        action.payload.filterObject.to
      ];
      let restaurantsInRange = state.allRestaurants.filter(restaurant => {
        return restaurant.rating >= from && restaurant.rating <= to;
      });
      return {
        ...state,
        restaurantsInRange: [...restaurantsInRange]
      };
    case UPDATE_FILTER_OBJECT:
      return {
        ...state,
        filterObject: { ...state.filterObject, ...action.payload.filterObj }
      };
    case OPEN_COMMENT_FORM:
      return {
        ...state,
        activeRestaurant: action.payload.place_id,
        activeCommentForm: true
      };
    case CLOSE_COMMENT_FORM:
      return {
        ...state,
        activeCommentForm: false
      };

    case TOGGLE_ADD_RESTAURANT_FORM:
      return {
        ...state,
        activeAddRestaurantForm: !state.activeAddRestaurantForm
      };
    case ADD_COMMENT:
      let allReviews = { ...state.allReviews };
      let id = action.payload.targetRestaurant;

      return {
        ...state,
        activeCommentForm: false,
        allReviews: {
          ...allReviews,
          [id]: [{ ...action.payload.commentObject }, ...allReviews[id]]
        }
      };
    case UPDATE_MAP_CENTER:
      return {
        ...state,
        mapCenter: {
          ...state.mapCenter,
          coords: {
            ...state.mapCenter.coords,
            lat: action.payload.coords.lat,
            lng: action.payload.coords.lng
          },
          place_id: action.payload.place_id
        }
      };

    case UPDATE_MAP_CENTER_FOR_FETCHING_RESTAURANTS:
      return {
        ...state,
        mapCenterForFetchingRestaurants: action.payload.center
      };
    case UPDATE_MAP_BOUNDS:
      return {
        ...state,
        mapBounds: action.payload.bounds
      };
    case TURN_OFF_ADD_COMMENT_BUTTON:
      let ID = action.payload.targetRestaurant;
      // find the index of the targetRestaurant, inorder to update the atrribute reviewAddable of it.
      let Index1 = state.allRestaurants.findIndex(restaurant => {
        return restaurant.place_id === ID;
      });
      // we alse need to update the restaurants in range. Otherwise, we need to dispatch the filterRestaurants action.
      let Index2 = state.restaurantsInRange.findIndex(restaurant => {
        return restaurant.place_id === ID;
      });

      return {
        ...state,
        allRestaurants: [
          ...state.allRestaurants.slice(0, Index1),
          {
            ...state.allRestaurants[Index1],
            reviewAddable: false
          },
          ...state.allRestaurants.slice(Index1 + 1)
        ],
        restaurantsInRange: [
          ...state.restaurantsInRange.slice(0, Index2),
          {
            ...state.restaurantsInRange[Index2],
            reviewAddable: false
          },
          ...state.restaurantsInRange.slice(Index2 + 1)
        ]
      };
    case GET_NEW_RESTAURANT_LOCATION:
      return {
        ...state,
        newRestaurantLocation: action.payload.location
      };
    case INITIALIZE_REVIEWS_FOR_NEW_RESTAURANT:
      return {
        ...state,
        allReviews: {
          ...state.allReviews,
          [action.payload.place_id]: []
        }
      };
    default:
      return state;
  }
}
