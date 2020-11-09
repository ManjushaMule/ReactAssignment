import * as actionTypes from './actionTypes';

export const setSuccessNotification = (msg) => {
    return {
        type: actionTypes.SET_NOTIFICATION_SUCCESS,
        msg
    }
}

export const hideNotification = () => {
    return {
        type: actionTypes.HIDE_NOTIFICATION
    }
}

export const setErrorNotification = (msg) => {
    return {
        type: actionTypes.SET_NOTIFICATION_ERROR,
        msg
    }
}