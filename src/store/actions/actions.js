import axios from '../../axios';
import * as actionTypes from './actionTypes';
import { setSuccessNotification, setErrorNotification } from './notificationActions';

const setHouseRecords = ( records ) => {
    return {
        type: actionTypes.SET_HOUSE_MAINT_RECORDS,
        records: records
    };
};

const fetchHouseMaintStart = () => {
    return {
        type: actionTypes.GET_HOUSE_MAINT_RECORDS_IN_PROGRESS
    }
}

const fetchIngredientsFailed = (error) => {
    return {
        type: actionTypes.GET_HOUSE_MAINT_RECORDS_FAILURE,
        error
    }
}

const addHouseMaintInProgress = () => {
    return {
        type: actionTypes.ADD_HOUSE_MAINT_IN_PROGRESS
    }
}

const addHouseMaintRecordFailure = () => {
    return {
        type: actionTypes.ADD_HOUSE_MAINT_RECORD_FAILURE
    }
}

const addHouseMaintRecordSuccess = (response, payload) => {
    return {
        type: actionTypes.ADD_HOUSE_MAINT_RECORD_SUCCESS,
        response,
        payload
    };
}

const updateHouseMaintInProgress = () => {
    return {
        type: actionTypes.UPDATE_HOUSE_MAINT_IN_PROGRESS
    }
}

const updateHouseRecordSuccess = (response) => {
    return {
        type: actionTypes.UPDATE_HOUSE_MAINT_RECORD_SUCCESS,
        payload: response
    };
}

const updateHouseRecordFailure = (response) => {
    return {
        type: actionTypes.UPDATE_HOUSE_MAINT_RECORD_FAILURE,
        payload: response
    };
}

const deleteHouseMaintRecordsInProgress = () => {
    return {
        type: actionTypes.DELETE_ALL_HOUSE_MAINT_IN_PROGRESS
    }
}

const deleteHouseMaintRecordsSuccess = (response) => {
    return {
        type: actionTypes.DELETE_ALL_HOUSE_MAINT_SUCCESS,
        response
    }
}

const deleteHouseMaintRecordsFailure = (response) => {
    return {
        type: actionTypes.DELETE_ALL_HOUSE_MAINT_FAILURE,
        response
    }
}

const deleteSelectedHouseMaintInProgress = () => {
    return {
        type: actionTypes.DELETE_SELECTED_HOUSE_MAINT_IN_PROGRESS
    }
}

const deleteSelectedHouseMaintSuccess = (response) => {
    return {
        type: actionTypes.DELETE_SELECTED_HOUSE_MAINT_SUCCESS,
        response
    }
}

const deleteSelectedHouseMaintFailure = (error) => {
    return {
        type: actionTypes.DELETE_SELECTED_HOUSE_MAINT_FAILURE,
        error
    }
}

const fetchHouseMaintenanceRecords = () => {
    console.log("***fetchHouseMaintenanceRecords");
    return dispatch => {
        dispatch(fetchHouseMaintStart());

        axios.get('/items.json')
        .then(response => {
            console.log("***In then setting house record", response.data);
            dispatch(setHouseRecords(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed(error));
            dispatch(setErrorNotification('Failed to load records. Please try again!'));
        });
    };
};

const updateHouseMaintenanceRecord = (payload) => {
    return dispatch => {
        dispatch(updateHouseMaintInProgress());
        
        axios.put('/items/'+payload.firebaseKey+".json", payload)
        .then(response => {
            dispatch(updateHouseRecordSuccess(response.data));
            dispatch(setSuccessNotification('Record updated successfully!'));
        })
        .catch(error => {
            dispatch(updateHouseRecordFailure(error))
            dispatch(setErrorNotification('Failed to update record. Please try again!'));
        });
    }
}

const updateSelectedFields = (fields) => {
    return {
        type: actionTypes.UPDATE_SELECETED_FIELDS,
        fields
    }
}

const addHouseMaintRecord = (payload) => {
    return dispatch => {
        dispatch(addHouseMaintInProgress());

        axios.post('/items.json', payload)
        .then( response => {
            dispatch(addHouseMaintRecordSuccess(response.data, payload));
            dispatch(setSuccessNotification('Record added Successfully!'));
        })
        .catch(error => {
            dispatch(addHouseMaintRecordFailure(error.data));
            dispatch(setErrorNotification('Failed to add record'));
        })
    }
}

const deleteHouseMaintRecords = () => {
    return dispatch => {
        dispatch(deleteHouseMaintRecordsInProgress());

        axios.delete('/items.json')
        .then( response => {
            dispatch(deleteHouseMaintRecordsSuccess(response.data));
            dispatch(setSuccessNotification('Records deleted successfully!'));
        })
        .catch(error => {
            dispatch(deleteHouseMaintRecordsFailure(error));
            dispatch(setErrorNotification('Failed to delete records. Please try again!'));
        })
    }
}

const deleteSelectedHouseMaintRecords = (payloadIds) => {
    return dispatch => { 
        dispatch(deleteSelectedHouseMaintInProgress());

        let promises = payloadIds.map((id) => {
            let url = "/items/" + id + ".json";
            return axios.delete(url);
        });
        
        Promise.all(promises).then((values) => {
            console.log(values);
            dispatch(deleteSelectedHouseMaintSuccess(values));
            dispatch(setSuccessNotification('Records deleted successfully!'));
        })
        .catch(error => {
            dispatch(deleteSelectedHouseMaintFailure(error));
            dispatch(setErrorNotification('Failed to delete records. Please try again!'));
        });
    }
}

export {
    addHouseMaintRecord,
    deleteSelectedHouseMaintRecords,
    deleteHouseMaintRecords,
    fetchHouseMaintenanceRecords,
    updateHouseMaintenanceRecord,
    updateSelectedFields
}