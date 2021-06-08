import { API_ROUTES, API_BASE_URL, API_HEADERS } from '../constants/api/endpoints';
import { camelCase, reduce } from 'lodash';


const buildFetch = ({parameters, body, queryParameters}, { METHOD, URL }) => {

    // Note: queryParameter routes not yet supported
    // Note: parameters routes not yet supported

    const payload = body ? JSON.stringify(body): null;

    const { username, id } = parameters || {};
    let URL_REGEX;
  
    //console.log(parameters);
    if (username) {
      URL_REGEX = URL.replace("<username>", username);
    }else if(id){
        URL_REGEX = URL.replace("<id>", id);
    }
    else{
        URL_REGEX = URL;
     }

    return fetch(`${API_BASE_URL}${URL_REGEX}`, {
        method: METHOD,
        headers: API_HEADERS,
        body: payload,
    })
}


const API = () => {
    return reduce(API_ROUTES, (routesObject, value, key) => {
        return {
            ...routesObject,
            [camelCase(key)]: 
                reduce(value, (routeMethods, value, key) => {
                    return {
                        ...routeMethods,
                        [camelCase(key)]: 
                        (parameters, body, queryParameters) => buildFetch({parameters, body, queryParameters}, value)
                    }
            }, {})
        }
    }, {});
}

export default API;