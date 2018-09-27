import actionTypes from '../types/actionTypes';

export function bookStoreLoadHasFailed(state = false, action) {
    switch (action.type) {
        case actionTypes.BOOK_STORE_ERROR:
            return action.bookStoreLoadHasFailed;

        default:
            return state;
    }
}

export function bookStoreIsLoading(state = false, action) {
    switch (action.type) {
        case actionTypes.LOADING_BOOK_STORE:
            return action.bookStoreIsLoading;

        default:
            return state;
    }
}

export function bookStoreLoadIsCompleted(state = false, action) {
    switch (action.type) {
        case actionTypes.BOOK_STORE_LOAD_COMPLETED:
            return action.bookStoreLoadIsCompleted;

        default:
            return state;
    }
}

export function bookStoreData(state = {}, action) {
    switch (action.type) {
        case actionTypes.BOOK_STORE_DATA:
            return action.data;

        default:
            return state;
    }
}