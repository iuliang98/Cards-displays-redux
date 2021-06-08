import {combineReducers} from 'redux'

import gistReducer from './gist.reducer';
const rootReducer = combineReducers({
    gist: gistReducer
});

export default rootReducer;