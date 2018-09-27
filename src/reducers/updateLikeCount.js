import actionTypes from '../types/actionTypes';

export function updateLikeCountFailed(state = false, action) {
    switch (action.type) {
        case actionTypes.UPDATE_LIKE_COUNT:
            return action.updateLikeCountFailed;

        default:
            return state;
    }
}