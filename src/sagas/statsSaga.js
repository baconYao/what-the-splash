import { take, fork, put, call } from "redux-saga/effects";

import { IMAGES } from "../constants";

import { fetchImageStats } from "../api";
import { loadImagesStats, setImagesStats, setImagesStatsError } from "../actions";

function* handleStatsRequest(id) {
    console.log('fetching stats for', id);
    // 當 fetch 不到image時，希望重試三次
    for (let i = 0; i < 3; i++) {
        try {
            yield put(loadImagesStats(id));
            const res = yield call(fetchImageStats, id);
            console.log(res);
            yield put(setImagesStats(id, res.downloads.total));
            return true
        } catch (err) { }
    }

    yield put(setImagesStatsError(id));
}

export default function* watchStatsRequest() {
    while (true) {
        // 一但所有 images 載入完成後，取出 image object
        const { images } = yield take(IMAGES.LOAD_SUCCESS);

        for (let i = 0; i < images.length; i++) {
            // fork 是 non-blocking，saga 不會等 handleStatsRequest 完成就繼續執行
            // call 是 blocking
            yield fork(handleStatsRequest, images[i].id)
        }
    }
}