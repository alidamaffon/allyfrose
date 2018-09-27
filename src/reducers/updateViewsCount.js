import actionTypes from '../types/actionTypes';

export function updateViewsCountFailed(state = false, action) {
    switch (action.type) {
        case actionTypes.UPDATE_VIEWS_COUNT:
            return action.updateViewsCountFailed;

        default:
            return state;
    }
}