import { combineReducers } from 'redux';
import {
    initDataLoadHasFailed,
    initDataIsLoading,
    initData
} from '../reducers/config';
import {
    configIsLoading,
    configLoadHasFailed,
    configLoadIsCompleted,
    configData
} from '../reducers/updateConfig';
import {
    bookStoreIsLoading,
    bookStoreLoadHasFailed,
    bookStoreLoadIsCompleted,
    bookStoreData
} from '../reducers/bookStore';
import { currentView } from '../reducers/currentView';
import { windowSize } from '../reducers/windowSize';
import { welcomeWasShown } from '../reducers/welcomeWasShown';
import { menuIsExpanded } from '../reducers/menuIsExpanded';
import { selectedBook } from '../reducers/selectedBook';
import {
    bookDescIsLoading,
    bookDescLoadHasFailed,
    bookDescLoadIsCompleted,
    bookDescData
} from '../reducers/bookDescription';
import {
    poetryIsLoading,
    poetryLoadHasFailed,
    poetryLoadIsCompleted,
    poetryData
} from '../reducers/poetry';
import {
    poetryDescIsLoading,
    poetryDescLoadHasFailed,
    poetryDescLoadIsCompleted,
    poetryDescData
} from '../reducers/poetryById';
import { sendContactMailHasFailed } from '../reducers/sendContactMail';
import {
    newsIsLoading,
    newsLoadHasFailed,
    newsLoadIsCompleted,
    newsData
} from '../reducers/news';
import { windowPosition } from '../reducers/windowPosition';
import { viewTitleTheme } from '../reducers/viewTitleTheme';
import { updateShareCountFailed } from '../reducers/updateShareCount';
import { updateLikeCountFailed } from '../reducers/updateLikeCount';
import { updateViewsCountFailed } from '../reducers/updateViewsCount';
import {
    policyIsLoading,
    policyLoadHasFailed,
    policyLoadIsCompleted,
    policyData
} from '../reducers/policy';

export default combineReducers({
    initDataLoadHasFailed,
    initDataIsLoading,
    initData,
    currentView,
    windowSize,
    configIsLoading,
    configLoadHasFailed,
    configLoadIsCompleted,
    configData,
    welcomeWasShown,
    menuIsExpanded,
    bookStoreIsLoading,
    bookStoreLoadHasFailed,
    bookStoreLoadIsCompleted,
    bookStoreData,
    selectedBook,
    bookDescIsLoading,
    bookDescLoadHasFailed,
    bookDescLoadIsCompleted,
    bookDescData,
    poetryIsLoading,
    poetryLoadHasFailed,
    poetryLoadIsCompleted,
    poetryData,
    poetryDescIsLoading,
    poetryDescLoadHasFailed,
    poetryDescLoadIsCompleted,
    poetryDescData,
    sendContactMailHasFailed,
    newsIsLoading,
    newsLoadHasFailed,
    newsLoadIsCompleted,
    newsData,
    windowPosition,
    viewTitleTheme,
    updateShareCountFailed,
    updateLikeCountFailed,
    updateViewsCountFailed,
    policyIsLoading,
    policyLoadHasFailed,
    policyLoadIsCompleted,
    policyData
});