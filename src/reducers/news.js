import actionTypes from '../types/actionTypes';

export function newsLoadHasFailed(state = false, action) {
    switch (action.type) {
        case actionTypes.NEWS_ERROR:
            return action.newsLoadHasFailed;

        default:
            return state;
    }
}

export function newsIsLoading(state = false, action) {
    switch (action.type) {
        case actionTypes.LOADING_NEWS:
            return action.newsIsLoading;

        default:
            return state;
    }
}

export function newsLoadIsCompleted(state = false, action) {
    switch (action.type) {
        case actionTypes.NEWS_LOAD_COMPLETED:
            return action.newsLoadIsCompleted;

        default:
            return state;
    }
}

export function newsData(state = {}, action) {
    switch (action.type) {
        case actionTypes.NEWS_DATA:
            return action.data;

        default:
            return state;
    }
}