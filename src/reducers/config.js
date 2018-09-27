import actionTypes from '../types/actionTypes'

export function initDataLoadHasFailed(state = false, action) {
    switch (action.type) {
        case actionTypes.INIT_DATA_ERROR:
            return action.initDataLoadHasFailed;

        default:
            return state;
    }
}

export function initDataIsLoading(state = false, action) {
    switch (action.type) {
        case actionTypes.LOADING_INIT_DATA:
            return action.initDataIsLoading;

        default:
            return state;
    }
}

export function initData(state = {}, action) {
    switch (action.type) {
        case actionTypes.INIT_DATA:
            return action.data;

        default:
            return state;
    }
}