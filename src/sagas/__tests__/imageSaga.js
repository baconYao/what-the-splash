import { runSaga } from 'redux-saga';

import { setImages, setError } from '../../actions';
import { getPage, handleImagesLoad } from '../imageSaga';
import * as api from '../../api';

test('selector gives back the page', () => {
    const nextPage = 1;
    const state = { nextPage };
    const res = getPage(state);
    expect(res).toBe(nextPage);
});

test('should load images and handle them in case of success', async () => {
    // dispatch actions
    const dispatchedActions = [];

    // 因為在做 unittest 不想 fetch 真的 data，因此我們要 mock
    const mockedImages = ['abc', 'div', '123'];
    api.fetchImages = jest.fn(() => Promise.resolve(mockedImages));     // 因為 fetchImages 會在 handleImagesLoad 被呼叫去 call 真實的 api，因此要 mock

    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action),
    }

    await runSaga(fakeStore, handleImagesLoad).done;
    // console.log(dispatchedActions);

    expect(api.fetchImages.mock.calls.length).toBe(1);  // 驗證只被呼叫一次 fetchImages
    expect(dispatchedActions).toContainEqual(setImages(mockedImages));
    // expect(dispatchedActions).not.toContainEqual(setImages(mockedImages));
});

test('should handle errors in case of fail', async () => {
    // dispatch actions
    const dispatchedActions = [];

    const error = 'some error is thrown'
    api.fetchImages = jest.fn(() => Promise.reject(error));

    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action),
    }

    await runSaga(fakeStore, handleImagesLoad).done;

    expect(api.fetchImages.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setError(error));
    // expect(dispatchedActions).not.toContainEqual(setError(error));
});