import actionTypes from '../types/actionTypes'

export function viewTitleTheme(state = {}, action) {
    switch (action.type) {
        case actionTypes.VIEW_TITLE_THEME:
            return action.currentTheme;

        default:
            return state;
    }
}

export default viewTitleTheme;