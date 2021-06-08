import {combineReducers} from 'redux'

import userReducer from './user.reducer';
import gistReducer from './gist.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    gist: gistReducer
});

export default rootReducer;