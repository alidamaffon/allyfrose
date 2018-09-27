import actionTypes from '../types/actionTypes';

export function bookStoreLoadHasFailed(bool) {
    return {
        type: actionTypes.BOOK_STORE_ERROR,
        bookStoreLoadHasFailed: bool
    };
}

export function bookStoreIsLoading(bool) {
    return {
        type: actionTypes.LOADING_BOOK_STORE,
        bookStoreIsLoading: bool
    };
}

export function bookStoreLoadIsCompleted(bool) {
    return {
        type: actionTypes.BOOK_STORE_LOAD_COMPLETED,
        bookStoreLoadIsCompleted: bool
    };
}

export function bookStoreData(data) {
    return {
        type: actionTypes.BOOK_STORE_DATA,
        data: data
    };
}

export function fetchBookStore() {
    return (dispatch) => {
        dispatch(bookStoreIsLoading(true));
        fetch('http://allyfrose.com/api/allyfrose/books', {
            method: 'GET', 
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(bookStoreLoadHasFailed(true));
            }
            dispatch(bookStoreIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(bookStoreData(data));
            dispatch(bookStoreLoadIsCompleted(true));
        })
        .catch((e) => {
            console.log('[Action] Catched exception while fetching [bookStore] ' + e);
            dispatch(bookStoreIsLoading(false));
            dispatch(bookStoreLoadHasFailed(true));
        });
    };

}