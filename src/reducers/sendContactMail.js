import actionTypes from '../types/actionTypes';

export function sendContactMailHasFailed(state = false, action) {
    switch (action.type) {
        case actionTypes.SEND_CONTACT_MAIL_ERROR:
            return action.sendContactMailHasFailed;

        default:
            return state;
    }
}