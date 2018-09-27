import actionTypes from '../types/actionTypes';

export function updateShareCountFailed(state = false, action) {
    switch (action.type) {
        case actionTypes.UPDATE_SHARE_COUNT:
            return action.updateShareCountFailed;

        default:
            return state;
    }
}