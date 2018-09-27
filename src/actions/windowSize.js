import actionTypes from '../types/actionTypes';

export function windowSizeChanged(windowSize) {
    return {
        type: actionTypes.WINDOW_SIZE,
        windowSize: windowSize
    };
}