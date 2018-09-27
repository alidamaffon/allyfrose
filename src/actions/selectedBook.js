import actionTypes from '../types/actionTypes';

export function selectedBook(data) {
    return {
        type: actionTypes.SELECTED_BOOK,
        selectedBook: data
    };
}