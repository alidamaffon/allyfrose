import actionTypes from '../types/actionTypes';

export function windowPosition(windowPosition) {
    return {
        type: actionTypes.WINDOW_POSITION,
        windowPosition: windowPosition
    };
}