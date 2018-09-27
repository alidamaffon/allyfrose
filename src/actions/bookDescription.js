import actionTypes from '../types/actionTypes';

export function bookDescLoadHasFailed(bool) {
    return {
        type: actionTypes.BOOK_DESCRIPTION_ERROR,
        bookDescLoadHasFailed: bool
    };
}

export function bookDescIsLoading(bool) {
    return {
        type: actionTypes.BOOK_DESCRIPTION_LOADING,
        bookDescIsLoading: bool
    };
}

export function bookDescLoadIsCompleted(bool) {
    return {
        type: actionTypes.BOOK_DESCRIPTION_LOAD_COMPLETED,
        bookDescLoadIsCompleted: bool
    };
}

export function bookDescData(data) {
    return {
        type: actionTypes.BOOK_DESCRIPTION_DATA,
        data: data
    };
}

export function fetchBookDescription(bookId) {
    let url = 'http://allyfrose.com/api/allyfrose/getBookDescription?bookId=' + bookId;
    
    return (dispatch) => {
        dispatch(bookDescIsLoading(true));
        fetch(url, {
            method: 'GET', 
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(bookDescLoadHasFailed(true));
            }
            dispatch(bookDescIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(bookDescData(data));
            dispatch(bookDescLoadIsCompleted(true));
        })
        .catch((e) => {
            console.log('[Action] Catched exception while fetching [bookDescription] ' + e);
            dispatch(bookDescIsLoading(false));
            dispatch(bookDescLoadHasFailed(true));
        });
    };

}