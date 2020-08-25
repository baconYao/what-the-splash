import { createStore } from 'redux';

import rootReducer from '../reducers';

const configureStore = () => {
    const store = createStore(
        rootReducer,
        // redux 開發工具，可不使用
        // https://ithelp.ithome.com.tw/articles/10192049
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
    return store;
}

export default configureStore;