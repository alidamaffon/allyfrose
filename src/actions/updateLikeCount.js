import actionTypes from '../types/actionTypes';

export function updateLikeCountFailed(bool) {
    return {
        type: actionTypes.UPDATE_LIKE_COUNT,
        updateLikeCountFailed: bool
    };
}

export function updateLikeCount(body) {
    let url = 'http://allyfrose.com/api/allyfrose/updateLikeCount';
    return (dispatch) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(updateLikeCountFailed(true));
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(updateLikeCountFailed(data.error));
        })
        .catch((e) => {
            console.log('[Action] Catched exception while updating nbLike' + e);
            dispatch(updateLikeCountFailed(true));
        });
    };

}