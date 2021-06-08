import { GET_FORKS } from '../types/gist.types';


export const getForks = (id) =>{
    return {
        meta:{
            resource: "gist",
            procedure: "getForks",
            payload: {
                parameters: { id },
                queryParameters:null,
                body:null
            },
            others: {
                gistId: id
            }
        },
        type: GET_FORKS
    };
};