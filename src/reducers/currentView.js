import actionTypes from '../types/actionTypes';
  
export function currentView (state = '', action) {
    switch (action.type) {
        case actionTypes.CURRENT_VIEW:
            return action.currentView
        default:
            return state;
    }
};
  
export default currentView;