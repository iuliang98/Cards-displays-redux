
import API from '../../services/apiService';
import { all, put, takeLatest } from 'redux-saga/effects';
import { GET_GISTS } from '../types/gist.types';
const _API = API();

export const handleRequestSaga = function* (action){
    const {resource, procedure} = action.meta;
    const {parameters, queryParameters, body} = action.meta.payload || {};

    const API_STREAM = yield _API[resource][procedure](parameters, body, queryParameters);


    try {
        const response = yield API_STREAM.json();
        yield put({
            type: `${action.type}_SUCCESS`,
            payload: response
        })

    } catch (error) {
        console.log('ERROR!')
    }

}


export const sagas = function* () {
    const ACTIONS = [GET_GISTS];

    yield all(ACTIONS.map((action) => takeLatest(action, handleRequestSaga)));
}