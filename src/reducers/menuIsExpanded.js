import actionTypes from '../types/actionTypes'

export function menuIsExpanded(state = false, action) {
    switch (action.type) {
        case actionTypes.EXPANDED_MENU:
            return action.menuIsExpanded;

        default:
            return state;
    }
}