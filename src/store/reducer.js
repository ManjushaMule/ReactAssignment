import * as actionTypes from './actions/actionTypes';

const initialState = {
    dataSet: [],
    selectedFields: [],
    isError: false,
    isFetching: false
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

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_HOUSE_MAINT_IN_PROGRESS: {
            return {
                ...state,
                isFetching: true
            }
        } 
        
        case actionTypes.SET_HOUSE_MAINT_RECORDS: {
            console.log("** In reducer to set records", action.records);
            const newRecords = parseRecordFromResponse(action.records);
            let fields = newRecords.map((d, i) => {return {checked: false} } );
            return {
                ...state,
                dataSet: newRecords,
                selectedFields: fields,
                isFetching: false
            }
        }

        default: 
            return state;
    }

    return state;
};


export default reducer;
