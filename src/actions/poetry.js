import actionTypes from '../types/actionTypes';

export function poetryLoadHasFailed(bool) {
    return {
        type: actionTypes.POETRY_ERROR,
        poetryLoadHasFailed: bool
    };
}

export function poetryIsLoading(bool) {
    return {
        type: actionTypes.LOADING_POETRY,
        poetryIsLoading: bool
    };
}

export function poetryLoadIsCompleted(bool) {
    return {
        type: actionTypes.POETRY_LOAD_COMPLETED,
        poetryLoadIsCompleted: bool
    };
}

export function poetryData(data) {
    return {
        type: actionTypes.POETRY_DATA,
        data: data
    };
}

export function fetchPoetry() {
    return (dispatch) => {
        dispatch(poetryIsLoading(true));
        fetch('http://allyfrose.com/api/allyfrose/poetry', {
            method: 'GET', 
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(poetryLoadHasFailed(true));
            }
            dispatch(poetryIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(poetryData(data));
            dispatch(poetryLoadIsCompleted(true));
        })
        .catch((e) => {
            console.log('[Action] Catched exception while fetching [Poetry] ' + e);
            dispatch(poetryIsLoading(false));
            dispatch(poetryLoadHasFailed(true));
        });
    };

}