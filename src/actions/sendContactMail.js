import actionTypes from '../types/actionTypes';

export function sendContactMailHasFailed(data) {
    return {
        type: actionTypes.SEND_CONTACT_MAIL_ERROR,
        sendContactMailHasFailed: data
    };
}

export function sendContactMail(body) {
    let url = 'http://allyfrose.com/api/allyfrose/sendEmailTo';
    return (dispatch) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(sendContactMailHasFailed({
                    error: true,
                    message: 'could not send email'
                }));
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            dispatch(sendContactMailHasFailed(data));
        })
        .catch((e) => {
            console.log('[Action] Catched exception while sending [Contact Email] ' + e);
            dispatch(sendContactMailHasFailed({
                error: true,
                message: 'could not send email'
            }));
        });
    };

}