import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import imageReducer from './imageReducer';
import errorReducer from './errorReducer';
import imagesReducer from './imageReducer';

const rootReducer = combineReducers({
    isLoading: loadingReducer,
    images: imagesReducer,
    error: errorReducer
});

export default rootReducer;