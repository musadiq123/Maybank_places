import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import placeReducer from './places/reducer';
import thunk from 'redux-thunk';


const store = createStore(
    combineReducers({
        places: placeReducer,
    }),
    applyMiddleware(thunk)
);

export default store