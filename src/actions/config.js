import actionTypes from '../types/actionTypes';
import localImg from '../config/localImgConfig.js';
import Tools from '../utilities/Tools';

export function initDataLoadHasFailed(bool) {
    return {
        type: actionTypes.INIT_DATA_ERROR,
        initDataLoadHasFailed: bool
    };
}

export function initDataIsLoading(bool) {
    return {
        type: actionTypes.LOADING_INIT_DATA,
        initDataIsLoading: bool
    };
}

export function initData(data) {
    return {
        type: actionTypes.INIT_DATA,
        data: data
    };
}

export function fetchInitData() {
    return (dispatch) => {
        dispatch(initDataIsLoading(true));

        fetch('http://allyfrose.com/api/allyfrose/getConfig', {
            method: 'GET', 
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(initDataLoadHasFailed(true));
            }

            dispatch(initDataIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            const config           = {};
            const storeData        = Tools.getStoreData();
            const shouldShowCookie = storeData.shouldShowCookie;

            let greetingMessage = '',
                imgUrl          = '',
                cookieMessage   = '';
            
            imgUrl  = (storeData.appLaunchCount > 0 && storeData.appLaunchCount <= 10) ? localImg.welcomeBackImg : (storeData.appLaunchCount > 10) ? localImg.frequentVisitorImg : localImg.welcomeImg;
            if (storeData.appLang) {
                config.lang = storeData.appLang;
                let greetingMessages = data[storeData.appLang].welcomeMessage;
                greetingMessage      = (storeData.appLaunchCount > 0 && storeData.appLaunchCount <= 10) ? greetingMessages.welcomeBack : (storeData.appLaunchCount > 10) ? greetingMessages.frequentVisitor : greetingMessages.welcome;
                cookieMessage        = data[storeData.appLang].cookieMessage;
            } else {
                greetingMessage      = (storeData.appLaunchCount > 0 && storeData.appLaunchCount <= 10) ? data.welcomeMessage.welcomeBack : (storeData.appLaunchCount > 10) ? data.welcomeMessage.frequentVisitor : data.welcomeMessage.welcome;
            }

            config.greetingImgUrl   = imgUrl;
            config.greetingMessage  = greetingMessage;
            config.shouldShowCookie = shouldShowCookie;
            config.cookieMessage    = cookieMessage;

            dispatch(initData(config));
        })
        .catch((e) => {
            console.log('[Action] Catched exception while fetching [initData] ' + e);
            dispatch(initDataIsLoading(false));
            dispatch(initDataLoadHasFailed(true));
        });
    };

}