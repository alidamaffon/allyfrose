import actionTypes from '../types/actionTypes';

export function currentViewChanged(currentView) {
    return {
        type: actionTypes.CURRENT_VIEW,
        currentView: currentView
    };
}