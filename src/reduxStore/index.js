import { combineReducers, createStore, applyMiddleware } from 'redux';
import reducerState from './reducerState';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    reducerState,
});
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)
export default store
