import * as actionTypes from '../actions/actionTypes';

const initialState = {
    dataSet: [],
    selectedFields: [],
    isError: false,
    isFetching: false,
    isSaving: false
}

const parseRecordFromResponse = (response) => {
    let newData = [];
    for (let item in response) {
        let obj = response[item];
        let newItem = {};
        for( let key in obj) {
            newItem[key] = obj[key];
        }
        newItem.firebaseKey = item;
        newData.push(newItem);
    }
    return newData;
}

const resetSelectedFields = (newDataSet) => {
    return newDataSet.map((d, i) => ({checked: false, locId: d.locationId}) );
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_HOUSE_MAINT_RECORDS_IN_PROGRESS:
        case actionTypes.DELETE_ALL_HOUSE_MAINT_IN_PROGRESS:
        case actionTypes.DELETE_SELECTED_HOUSE_MAINT_IN_PROGRESS: {
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
                message: ""
            }
        }

        case actionTypes.UPDATE_HOUSE_MAINT_IN_PROGRESS:
        case actionTypes.ADD_HOUSE_MAINT_IN_PROGRESS: {
            return {
                ...state,
                isSaving: true,
                isError: false,
                isSuccess: false,
                message: ""
            }
        }

        case actionTypes.GET_HOUSE_MAINT_RECORDS_FAILURE:
        case actionTypes.DELETE_ALL_HOUSE_MAINT_FAILURE:
        case actionTypes.DELETE_SELECTED_HOUSE_MAINT_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: "Something went wrong... Please try again."
            }
        }

        case actionTypes.UPDATE_HOUSE_MAINT_RECORD_FAILURE:
        case actionTypes.ADD_HOUSE_MAINT_RECORD_FAILURE: {
            return {
                ...state,
                isSaving: false,
                isError: true,
                message: "Failed to update the house maintenance record! Please Try again."
            }
        }

        case actionTypes.SET_HOUSE_MAINT_RECORDS: {
            console.log("** In reducer to set records", action.records);
            const newRecords = parseRecordFromResponse(action.records);
            let fields = resetSelectedFields(newRecords);
            return {
                ...state,
                dataSet: newRecords,
                selectedFields: fields,
                isLoading: false
            }
        }

        case actionTypes.UPDATE_HOUSE_MAINT_RECORD_SUCCESS: {
            const payload = action.payload;
            const data = state.dataSet.map((d,i) => {
                if(d.firebaseKey === payload.firebaseKey) {
                    return payload;
                }
                return d;
            });
            let fields = resetSelectedFields(data);
            return {
                ...state,
                dataSet: data,
                isSaving: false,
                selectedFields: fields
            }
        }

        case actionTypes.UPDATE_SELECETED_FIELDS: {
            return {
                ...state,
                selectedFields: action.fields
            }
        }

        case actionTypes.ADD_HOUSE_MAINT_RECORD_SUCCESS: {
            const data = [...state.dataSet];
            
            action.payload.firebaseKey = action.response.name;
            data.push(action.payload);
            
            const newFields = resetSelectedFields(data);
            
            return {
                ...state,
                isSaving: false,
                dataSet: data,
                selectedFields: newFields,
                isSuccess: true,
                message: "Record Added successfully"
            }
        }

        case actionTypes.DELETE_ALL_HOUSE_MAINT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                dataSet: [],
                selectedFields: []
            }
        }

        case actionTypes.DELETE_SELECTED_HOUSE_MAINT_SUCCESS: {
            let deletedIds = [];
            action.response.map((data,i) => {
                let url = data.config.url;
                //Here url format is => "/items/-MLC-uVQFzrlxXZwrNBV.json"
                let values = url.split('/');
                let firebaseKey = values[2].split('.')[0];
                deletedIds.push(firebaseKey);
            });
            
            let newDataSet = state.dataSet.filter((data, i) => {
                let key = data.firebaseKey;
                if(!deletedIds.includes(key)){
                    return data;
                }
            });
            
            let fields = resetSelectedFields(newDataSet);

            return {
                ...state,
                isLoading: false,
                dataSet: newDataSet,
                selectedFields: fields
            }
        }

        default: 
            return state;
    }
};


export default reducer;
