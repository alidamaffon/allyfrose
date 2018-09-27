import actionTypes from '../types/actionTypes';

export function policyLoadHasFailed(bool) {
    return {
        type: actionTypes.POLICY_ERROR,
        policyLoadHasFailed: bool
    };
}

export function policyIsLoading(bool) {
    return {
        type: actionTypes.LOADING_POLICY,
        policyIsLoading: bool
    };
}

export function policyLoadIsCompleted(bool) {
    return {
        type: actionTypes.POLICY_LOAD_COMPLETED,
        policyLoadIsCompleted: bool
    };
}

export function policyData(data) {
    return {
        type: actionTypes.POLICY_DATA,
        data: data
    };
}

export function fetchPolicyData(lang) {
    const url = 'http://allyfrose.com/api/allyfrose/cookiePolicy?lang=' + lang;
    return (dispatch) => {
        dispatch(policyIsLoading(true));
        fetch(url, {
            method: 'GET', 
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(policyLoadHasFailed(true));
            }
            dispatch(policyIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(policyData(data));
            dispatch(policyLoadIsCompleted(true));
        })
        .catch((e) => {
            console.log('[Action] Catched exception while fetching [policy data] ' + e);
            dispatch(policyIsLoading(false));
            dispatch(policyLoadHasFailed(true));
        });
    };

}