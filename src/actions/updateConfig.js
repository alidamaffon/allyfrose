import Tools from '../utilities/Tools';
import actionTypes from '../types/actionTypes';
import Constants from '../utilities/Constants';
import localImg from '../config/localImgConfig';
import { viewTitleTheme } from './viewTitleTheme';


export function configLoadHasFailed(bool) {
    return {
        type: actionTypes.CONFIG_DATA_ERROR,
        configLoadHasFailed: bool
    };
}

export function configIsLoading(bool) {
    return {
        type: actionTypes.LOADING_CONFIG_DATA,
        configIsLoading: bool
    };
}

export function configLoadIsCompleted(bool) {
    return {
        type: actionTypes.CONFIG_LOAD_COMPLETED,
        configLoadIsCompleted: bool
    };
}

export function configData(data) {
    return {
        type: actionTypes.CONFIG_DATA,
        data: data
    };
}

export function fetchConfig(lang) {
    return (dispatch) => {
        dispatch(configIsLoading(true));
        fetch('http://allyfrose.com/api/allyfrose/getConfig', {
            method: 'GET', 
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(configLoadHasFailed(true));
            }
            dispatch(configIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            let config      = {};
            const storeData = Tools.getStoreData();
            let theme       = Constants.defaultTheme;

            if (lang) {
                config = data[lang];
                config.lang = lang;
                Tools.setAppLang(lang);
            } else if (storeData.appLang) {
                config = data[storeData.appLang];
                config.lang = storeData.appLang;
            } else {
                config = data[Constants.lang.en.short];
                Tools.setAppLang(Constants.lang.en.short);
            }
            
            config.shouldShowCookie = storeData.shouldShowCookie;


            if (config.themes && config.themes.length) {
                let themes = config.themes;
                theme = themes[Math.floor(Math.random() * themes.length)];
            }
            let themeBackgrounds = localImg.themeBackgrounds;
            theme.background = themeBackgrounds[Math.floor(Math.random() * themeBackgrounds.length)];

            dispatch(configData(config));
            dispatch(configLoadIsCompleted(true));
            dispatch(viewTitleTheme(theme));
        })
        .catch((e) => {
            console.log('[Action] Catched exception while fetching [configData] ' + e);
            dispatch(configIsLoading(false));
            dispatch(configLoadHasFailed(true));
        });
    };

}