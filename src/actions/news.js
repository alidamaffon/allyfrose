import actionTypes from '../types/actionTypes';

export function newsLoadHasFailed(bool) {
    return {
        type: actionTypes.NEWS_ERROR,
        newsLoadHasFailed: bool
    };
}

export function newsIsLoading(bool) {
    return {
        type: actionTypes.LOADING_NEWS,
        newsIsLoading: bool
    };
}

export function newsLoadIsCompleted(bool) {
    return {
        type: actionTypes.NEWS_LOAD_COMPLETED,
        newsLoadIsCompleted: bool
    };
}

export function newsData(data) {
    return {
        type: actionTypes.NEWS_DATA,
        data: data
    };
}

export function fetchNews() {
    return (dispatch) => {
        dispatch(newsIsLoading(true));
        fetch('http://allyfrose.com/api/allyfrose/news', {
            method: 'GET', 
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(newsLoadHasFailed(true));
            }
            dispatch(newsIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            data.data.sort(function(a, b) {
                return (new Date(b.created) - new Date(a.created));
            })
            dispatch(newsData(data));
            dispatch(newsLoadIsCompleted(true));
        })
        .catch((e) => {
            console.log('[Action] Catched exception while fetching [News] ' + e);
            dispatch(newsIsLoading(false));
            dispatch(newsLoadHasFailed(true));
        });
    };

}