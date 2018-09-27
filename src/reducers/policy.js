import actionTypes from '../types/actionTypes';

export function policyLoadHasFailed(state = false, action) {
    switch (action.type) {
        case actionTypes.POLICY_ERROR:
            return action.policyLoadHasFailed;

        default:
            return state;
    }
}

export function policyIsLoading(state = false, action) {
    switch (action.type) {
        case actionTypes.LOADING_POLICY:
            return action.policyIsLoading;

        default:
            return state;
    }
}

export function policyLoadIsCompleted(state = false, action) {
    switch (action.type) {
        case actionTypes.POLICY_LOAD_COMPLETED:
            return action.policyLoadIsCompleted;

        default:
            return state;
    }
}

export function policyData(state = {}, action) {
    switch (action.type) {
        case actionTypes.POLICY_DATA:
            return action.data;

        default:
            return state;
    }
}