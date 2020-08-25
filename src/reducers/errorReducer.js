// 處理 error 的狀態
import { IMAGES } from '../constants';

const errorReducer = (state = [], action) => {
    switch (action.type) {
        case IMAGES.LOAD:
        case IMAGES.LOAD_SUCCESS:
            return null;
        case IMAGES.LOAD_FAIL:
            return action.error;
        default:
            return state;
    }
}

export default errorReducer;