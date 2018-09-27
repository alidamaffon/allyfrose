import actionTypes from '../types/actionTypes';

export function bookDescLoadHasFailed(state = false, action) {
    switch (action.type) {
        case actionTypes.BOOK_DESCRIPTION_ERROR:
            return action.bookDescLoadHasFailed;

        default:
            return state;
    }
}

export function bookDescIsLoading(state = false, action) {
    switch (action.type) {
        case actionTypes.BOOK_DESCRIPTION_LOADING:
            return action.bookDescIsLoading;

        default:
            return state;
    }
}

export function bookDescLoadIsCompleted(state = false, action) {
    switch (action.type) {
        case actionTypes.BOOK_DESCRIPTION_LOAD_COMPLETED:
            return action.bookDescLoadIsCompleted;

        default:
            return state;
    }
}

export function bookDescData(state = {}, action) {
    switch (action.type) {
        case actionTypes.BOOK_DESCRIPTION_DATA:
            return action.data;

        default:
            return state;
    }
}