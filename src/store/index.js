import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(sagaMiddleware),
            // redux 開發工具，可不使用
            // https://ithelp.ithome.com.tw/articles/10192049
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        ),
    );
    sagaMiddleware.run(rootSaga);

    store.dispatch({ type: 'HELLO' });       // dispatch action to rootSaga, then triger workerSaga's depends on type "HELLO"
    return store;
}

export default configureStore;