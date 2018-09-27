import actionTypes from '../types/actionTypes';
  
export function selectedBook (state = {}, action) {
    switch (action.type) {
        case actionTypes.SELECTED_BOOK:
            return action.selectedBook
        default:
            return state;
    }
};
  
export default selectedBook;