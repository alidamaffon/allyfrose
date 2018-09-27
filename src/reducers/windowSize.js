import actionTypes from '../types/actionTypes';
  
export function windowSize (state = window.innerWidth, action) {
    switch (action.type) {
        case actionTypes.WINDOW_SIZE:
            return action.windowSize
        default:
            return state;
    }
};
  
export default windowSize;