import actionTypes from '../types/actionTypes';

export function configLoadHasFailed(state = false, action) {
    switch (action.type) {
        case actionTypes.CONFIG_DATA_ERROR:
            return action.configLoadHasFailed;

        default:
            return state;
    }
}

export function configIsLoading(state = false, action) {
    switch (action.type) {
        case actionTypes.LOADING_CONFIG_DATA:
            return action.configIsLoading;

        default:
            return state;
    }
}

export function configLoadIsCompleted(state = false, action) {
    switch (action.type) {
        case actionTypes.CONFIG_LOAD_COMPLETED:
            return action.configLoadIsCompleted;

        default:
            return state;
    }
}

export function configData(state = {}, action) {
    switch (action.type) {
        case actionTypes.CONFIG_DATA:
            return action.data;

        default:
            return state;
    }
}