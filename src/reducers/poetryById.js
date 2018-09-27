import actionTypes from '../types/actionTypes';

export function poetryDescLoadHasFailed(state = false, action) {
    switch (action.type) {
        case actionTypes.POETRY_DESC_ERROR:
            return action.poetryDescLoadHasFailed;

        default:
            return state;
    }
}

export function poetryDescIsLoading(state = false, action) {
    switch (action.type) {
        case actionTypes.LOADING_POETRY_DESC:
            return action.poetryDescIsLoading;

        default:
            return state;
    }
}

export function poetryDescLoadIsCompleted(state = false, action) {
    switch (action.type) {
        case actionTypes.POETRY_DESC_LOAD_COMPLETED:
            return action.poetryDescLoadIsCompleted;

        default:
            return state;
    }
}

export function poetryDescData(state = {}, action) {
    switch (action.type) {
        case actionTypes.POETRY_DESC_DATA:
            return action.data;

        default:
            return state;
    }
}