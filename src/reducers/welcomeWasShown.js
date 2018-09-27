import actionTypes from '../types/actionTypes'

export function welcomeWasShown(state = false, action) {
    switch (action.type) {
        case actionTypes.WELCOME_WAS_SHOWN:
            return action.welcomeWasShown;

        default:
            return state;
    }
}