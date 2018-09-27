import actionTypes from '../types/actionTypes';

export function poetryDescLoadHasFailed(bool) {
    return {
        type: actionTypes.POETRY_DESC_ERROR,
        poetryDescLoadHasFailed: bool
    };
}

export function poetryDescIsLoading(bool) {
    return {
        type: actionTypes.LOADING_POETRY_DESC,
        poetryDescIsLoading: bool
    };
}

export function poetryDescLoadIsCompleted(bool) {
    return {
        type: actionTypes.POETRY_DESC_LOAD_COMPLETED,
        poetryDescLoadIsCompleted: bool
    };
}

export function poetryDescData(data) {
    return {
        type: actionTypes.POETRY_DESC_DATA,
        data: data
    };
}

export function fetchPoetryDesc(poetryId) {
    let url = 'http://allyfrose.com/api/allyfrose/getPoetryById?poetryId=' + poetryId;
    return (dispatch) => {
        dispatch(poetryDescIsLoading(true));
        fetch(url, {
            method: 'GET', 
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(poetryDescLoadHasFailed(true));
            }
            dispatch(poetryDescIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(poetryDescData(data));
            dispatch(poetryDescLoadIsCompleted(true));
        })
        .catch((e) => {
            console.log('[Action] Catched exception while fetching [PoetryItem] ' + e);
            dispatch(poetryDescIsLoading(false));
            dispatch(poetryDescLoadHasFailed(true));
        });
    };

}