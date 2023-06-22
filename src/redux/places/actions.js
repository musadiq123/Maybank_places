import { ADD_PLACES, REMOVE_PLACES } from "./actionTypes"

export const addPlaces = (places) => {
    return (dispatch) => {
        dispatch({
            type: ADD_PLACES,
            payload: places
        });
    }
}

export const removePlaces = (places) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_PLACES,
            payload: places
        });
    }
}