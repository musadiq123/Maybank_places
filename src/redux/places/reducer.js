import { ADD_PLACES, REMOVE_PLACES } from "./actionTypes";
const initialState = {
    allPlaces: []
}

const placeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACES: return {
            allPlaces: [...state.allPlaces, action.payload]
        }
        case REMOVE_PLACES: return {
            allPlaces: []
        }
        default:
            return state;
    }
}

export default placeReducer