import axios from '../../axios';
import * as actionTypes from './actionTypes';

export const setHouseRecords = ( records ) => {
    return {
        type: actionTypes.SET_HOUSE_MAINT_RECORDS,
        records: records
    };
};

export const fetchHouseMaintStart = () => {
    return {
        type: actionTypes.FETCH_HOUSE_MAINT_IN_PROGRESS
    }
}

export const fetchHouseMaintenanceRecords = () => {
    console.log("***fetchHouseMaintenanceRecords");
    return dispatch => {
        dispatch(fetchHouseMaintStart());

        axios.get('/items.json')
        .then(response => {
            console.log("***In then setting house record", response.data);
            dispatch(setHouseRecords(response.data));
        })
        // .catch(error => dispatch(fetchIngredientsFailed()));
    };
};