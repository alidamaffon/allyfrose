import actionTypes from '../types/actionTypes';
  
export function windowPosition (state = {}, action) {
    switch (action.type) {
        case actionTypes.WINDOW_POSITION:
            return action.windowPosition
        default:
            return state;
    }
};
  
export default windowPosition;