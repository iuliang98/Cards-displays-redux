import {GET_GISTS, GET_GISTS_SUCCESS, GET_GISTS_FAIL} from '../types/user.types';


const INITIAL_STATE = {
    gists: [],
};


const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case GET_GISTS:
            return {
                ...state, 
                gists: [],
            };
        case GET_GISTS_SUCCESS:
            return {
                ...state, 
                gists: action.payload,
            };
        case GET_GISTS_FAIL:
            return {
                ...state, 
                gists: []
            };
            default: return state;
    }
};

export default reducer;