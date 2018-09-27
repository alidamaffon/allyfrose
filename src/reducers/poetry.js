import actionTypes from '../types/actionTypes';

export function poetryLoadHasFailed(state = false, action) {
    switch (action.type) {
        case actionTypes.POETRY_ERROR:
            return action.poetryLoadHasFailed;

        default:
            return state;
    }
}

export function poetryIsLoading(state = false, action) {
    switch (action.type) {
        case actionTypes.LOADING_POETRY:
            return action.poetryIsLoading;

        default:
            return state;
    }
}

export function poetryLoadIsCompleted(state = false, action) {
    switch (action.type) {
        case actionTypes.POETRY_LOAD_COMPLETED:
            return action.poetryLoadIsCompleted;

        default:
            return state;
    }
}

export function poetryData(state = {}, action) {
    switch (action.type) {
        case actionTypes.POETRY_DATA:
            return action.data;

        default:
            return state;
    }
}