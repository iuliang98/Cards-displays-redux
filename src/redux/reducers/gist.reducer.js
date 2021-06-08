import {GET_FORKS, GET_FORKS_SUCCESS, GET_FORKS_FAIL} from '../types/gist.types';


const INITIAL_STATE = {
    forks: {},
};


const reducer = (state = INITIAL_STATE, action) => {

    if(action && action.meta){
        //console.log("gist id",action.meta.gistId)
        /*console.log("reducer", {
            ...state.forks,
            [`${action.meta.gistId}`] : action.payload
        });*/
    }


    switch (action.type) {
        case GET_FORKS:
            return {
                ...state 
            };
        case GET_FORKS_SUCCESS:
            return {
                ...state, 
                forks: {
                    ...state.forks,
                    [`${action.meta.gistId}`] : action.payload
                }
            };
        case GET_FORKS_FAIL:
            return {
                ...state 
            };
            default: return state;
    }
};

export default reducer;