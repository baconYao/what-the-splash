import { takeEvery, put } from "redux-saga/effects";

// watcher saga -> actions -> worker saga

function* workerSaga() {
    console.log('Hey from worker saga');
    console.log(put({ type: 'ACTION_FROM_WORKER' }));
    // 用 put 觸發 action
    yield put({ type: 'ACTION_FROM_WORKER' });
}

// watcher saga
function* rootSaga() {
    console.log("Hey World rootSaga");
    yield takeEvery('HELLO', workerSaga);
}

export default rootSaga;