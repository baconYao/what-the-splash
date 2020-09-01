import { takeEvery, select, call, put } from "redux-saga/effects";

import { IMAGES } from '../constants';
import { fetchImages } from '../api';
import { setImages, setError } from '../actions';
// watcher saga -> actions -> worker saga

export const getPage = state => state.nextPage;    // 存取 state 內的 nextPage 值 (nextPage被宣告在reducers/index.js)

//worker saga
export function* handleImagesLoad() {
    try {
        const page = yield select(getPage);
        console.log("Page", page)
        const images = yield call(fetchImages, page);
        console.log("images", images)
        yield put(setImages(images));
    } catch (err) {
        // dispatch error
        yield put(setError(err.toString()));
    }
}

// watcher saga
export default function* watchImageLoad() {
    yield takeEvery(IMAGES.LOAD, handleImagesLoad);
}

