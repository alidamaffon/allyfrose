import actionTypes from '../types/actionTypes';

export function viewTitleTheme(theme) {
    return {
        type: actionTypes.VIEW_TITLE_THEME,
        currentTheme: theme
    };
}