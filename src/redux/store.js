import { createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {sagas} from './sagas/requestSaga';

import rootReducer from './reducers/index';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(...middleware))
);

sagaMiddleware.run(sagas);

export default store;