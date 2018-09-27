import actionTypes from '../types/actionTypes';

export function updateShareCountFailed(bool) {
    return {
        type: actionTypes.UPDATE_SHARE_COUNT,
        updateShareCountFailed: bool
    };
}

export function updateShareCount(body) {
    let url = 'http://allyfrose.com/api/allyfrose/updateShareCount';
    return (dispatch) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(updateShareCountFailed(true));
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(updateShareCountFailed(data.error));
        })
        .catch((e) => {
            console.log('[Action] Catched exception while updating nbShare' + e);
            dispatch(updateShareCountFailed(true));
        });
    };

}