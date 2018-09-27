import actionTypes from '../types/actionTypes';

export function welcomeWasShown(bool) {
    return {
        type: actionTypes.WELCOME_WAS_SHOWN,
        welcomeWasShown: bool
    };
}