import actionTypes from '../types/actionTypes';

export function menuIsExpanded(bool) {
    return {
        type: actionTypes.EXPANDED_MENU,
        menuIsExpanded: bool
    };
}