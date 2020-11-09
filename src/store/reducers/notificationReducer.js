import * as actionTypes from '../actions/actionTypes';

const initialState = {
    //isSuccess: false,
    message: '',
    showNotification: false,
    type: '',
    //isError: false
}

const notificationReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_NOTIFICATION_SUCCESS: {
            return {
                ...state,
                //isSuccess: true,
                message: action.msg,
                showNotification: true,
                type: 'success'
            }
        }

        case actionTypes.HIDE_NOTIFICATION: {
            return {
                ...state,
                showNotification: false
            }
        }

        case actionTypes.SET_NOTIFICATION_ERROR: {
            return {
                ...state,
                //isError: true,
                type: 'danger',
                message: action.msg,
                showNotification: true
            }
        }

        default: {
            return state;
        }
    }
}

export default notificationReducer;
  