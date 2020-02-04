import { combineReducers } from 'redux';
import reducers from './containerReducer';
import { createStore } from 'redux';

const store = createStore(
    combineReducers({
        reducers
    })
)
export default store