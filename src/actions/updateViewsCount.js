import actionTypes from '../types/actionTypes';

export function updateViewsCountFailed(bool) {
    return {
        type: actionTypes.UPDATE_VIEWS_COUNT,
        updateViewsCountFailed: bool
    };
}

export function updateViewsCount(body) {
    let url = 'http://allyfrose.com/api/allyfrose/updateViewsCount';
    return (dispatch) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(updateViewsCountFailed(true));
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(updateViewsCountFailed(data.error));
        })
        .catch((e) => {
            console.log('[Action] Catched exception while updating nbViews' + e);
            dispatch(updateViewsCountFailed(true));
        });
    };

}