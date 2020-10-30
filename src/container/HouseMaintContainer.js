import React, {Component} from 'react';
import TableWrapper from '../components/TableWrapper';
import FormWrapper from '../components/FormWrapper';
//import firebase from '../firebase/Firebase';
import axios from '../axios';
import './HouseMaintContainer.scss'

const HEADERS = [
    'Loc Id',
    'House Code',
    'House Description',
    'Vendor',
    'Email Id',
    'Spot TV',
    'Spot Radio',
    'Net TV',
    'Net Radio',
    'Unwired Network'
]

const FORM_SCHEMA = {
    locationId: {
        label: 'Location Id',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: ''
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        isDisabled: false
    },
    houseCode: {
        label: 'House Code',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: ''
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    houseDesc: {
        label: 'House Description',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: ''
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        isDisabled: false
    },
    vendor: {
        label: 'Vendor',
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: ''
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        isDisabled: false,
        cssClass: 'col-sm-4',
        //hasRowEnd: true
    },
    email: {
        label: 'Email Id',
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'abc@xyx.com',
            //disabled: true
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    spotTV: {
        label: 'Spot TV',
        elementType: 'input',
        elementConfig: {
            type: 'checkbox',
            //placeholder: 'abc@xyx.com',
            //disabled: true
        },
        value: '',
        validation: {
            //required: true
        },
        valid: false,
        touched: false
    },
    spotRadio: {
        label: 'Spot Radio',
        elementType: 'input',
        elementConfig: {
            type: 'checkbox',
            //placeholder: 'abc@xyx.com',
            //disabled: true
        },
        value: '',
        validation: {
            //required: true
        },
        valid: false,
        touched: false
    },
    networkTV: {
        label: 'Network TV',
        elementType: 'input',
        elementConfig: {
            type: 'checkbox',
            //placeholder: 'abc@xyx.com',
            //disabled: true
        },
        value: '',
        validation: {
            //required: true
        },
        valid: false,
        touched: false
    },
    networkRadio: {
        label: 'Network Radio',
        elementType: 'input',
        elementConfig: {
            type: 'checkbox',
            //placeholder: 'abc@xyx.com',
            //disabled: true
        },
        value: '',
        validation: {
            //required: true
        },
        valid: false,
        touched: false
    },
    unwiredNetwork: {
        label: 'Unwired Network',
        elementType: 'input',
        elementConfig: {
            type: 'checkbox',
            //placeholder: 'abc@xyx.com',
            //disabled: true
        },
        value: '',
        validation: {
            //required: true
        },
        valid: false,
        touched: false
    },
    productionServiceAvailable: {
        label: 'Production Service Available',
        elementType: 'input',
        elementConfig: {
            type: 'checkbox',
            //placeholder: 'abc@xyx.com',
            //disabled: true
        },
        value: '',
        validation: {
            //required: true
        },
        valid: false,
        touched: false
    },
    productionServiceDefault: {
        label: 'Production Service Default',
        elementType: 'input',
        elementConfig: {
            type: 'checkbox',
            //placeholder: 'abc@xyx.com',
            //disabled: true
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    firebaseKey: {
        elementType: 'input',
        elementConfig: {
            type: 'hidden'
        },
        value: "",
        valid: true,
    }
}

class HouseMaintContainer extends Component { 

    constructor(props) {
        super(props);
        
        this.state = {
           dataSet: [],
           showForm: false,
           selectedFields:[],
           isSelectAll: false,
           isFormEdit: false,
           formSchema : {...FORM_SCHEMA},
           isFetching: false
        }
        this.fetchHouseMaintRecords = this.fetchHouseMaintRecords.bind(this);
    }

    componentDidMount() {
    	this.fetchHouseMaintRecords();
    }

    parseRecordFromResponse(response) {
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

    initializeFormSchema = () => {
        const formSchema = {...this.state.formSchema}
        for(let key in formSchema) {
            if(!!formSchema[key]) {
                formSchema[key].value = "";
                formSchema[key].checked = "";
                formSchema[key].valid = false;
            }
        }

    }

    fetchHouseMaintRecords() {
        console.log("**fetching records");
        this.setState({
            isFetching: true
        });
        axios.get('/items.json')
            .then(response => {
                console.log("success", response.data);
                if(!!response.data) {
                    const newDataSet = this.parseRecordFromResponse(response.data);
                    let fields = newDataSet.map((d, i) => {return {checked: false} } );
                    this.setState({
                        dataSet: newDataSet,
                        selectedFields: fields,
                        isFetching: false
                    });
                } else {
                    this.setState({
                        dataSet: [],
                        selectedFields: [],
                        isFetching: false
                    });
                }
        })
        .catch(error => console.log(error));
    }

    handleAdd = () => {
        this.setState({
            showForm: true,
            formSchema : Object.assign({}, FORM_SCHEMA)
        })
    }

    handleFormSubmit = (payload) => {
        let showForm = false;
        const {isFormEdit} = this.state;
        this.setState({
            isFetching: true
        })

        if(!!payload) {

            if(isFormEdit) {
                axios.put('/items/'+payload.firebaseKey+".json", payload)
                .then(response => {
                    console.log(response);
                    this.setState({
                        showForm: showForm,
                        isFetching: false
                    });
                    this.fetchHouseMaintRecords();
                })
            }
            else {
                axios.post('/items.json', payload)
                .then( response => {
                    console.log("res", response)
                    this.setState({
                        showForm: showForm,
                        isFetching: false
                    });
                    this.fetchHouseMaintRecords();
                })
            }

        }
        else {
            this.setState({
                showForm: showForm,
                isFetching: false
            });
        }

        //Clean the values of formSchema
        this.initializeFormSchema();
        
    }

    handleDelete = () => {
        console.log("to remove", this.state.selectedFields);
        const { selectedFields, isSelectAll } = this.state;
        this.setState({
            isFetching: true
        });
        
        let payloadIds = [];
        if (isSelectAll) {
            axios.delete('/items.json')
                .then(response => {
                    console.log(response);
                    //this.fetchHouseMaintRecords();
                    this.setState({
                        dataSet: [],
                        selectedFields: [],
                        isSelectAll: false,
                        isFetching: false
                    });
                });
        }
        else {
            for (let field in selectedFields) {
                if(selectedFields[field].checked) {
                    payloadIds.push(selectedFields[field].data.firebaseKey);
                }
            }
            console.log(payloadIds);
            if(payloadIds.length) {
                let promises = payloadIds.map((id) => {
                    let url = "/items/" + id + ".json";
                    return axios.delete(url);
                });
                
                Promise.all(promises).then((values) => {
                    console.log(values);
                    console.log("thiss", this);
                    this.fetchHouseMaintRecords();
                });
            }
        }
    }

    handleSelectAll = (isSelectAll) => {
        const {selectedFields, dataSet} = this.state;
        let newFields;

        if(isSelectAll) {
            newFields = selectedFields.map((f, index) => {
                return {
                    checked: true,
                    data: dataSet[index]
                }   
            });
        }
        else { 
            newFields = selectedFields.map((f, index) => {
                return {
                    checked: false
                }
            }); 
        }
        
        this.setState({
            selectedFields: newFields,
            isSelectAll: isSelectAll
        });
    }

    isAllFieldsSelected = (fields) => {
        let isAll = true;
        fields.map(f => {
            if(!f.checked){
                isAll = false;
            }
        });

        return isAll;
    }

    handleFieldSelection = (item, index) => {
        let newFields = [...this.state.selectedFields];
        newFields[index] = {
            checked: !newFields[index].checked,
            data: item
        }
        
        const isAll = this.isAllFieldsSelected(newFields);
        this.setState({
            selectedFields: newFields,
            isSelectAll: isAll
        });
    }
    
    handleFormEdit = () => {
        const selectedFields = [...this.state.selectedFields];
        const formSchema = {...this.state.formSchema}
        
        const field = selectedFields.find(f => {
            return f.checked === true
        });

        const rowData = field.data;
        console.log("iii", field);
        for(let key in rowData) {
            if(!!formSchema[key]) {
                formSchema[key].value = rowData[key];
                formSchema[key].checked = rowData[key];
                formSchema[key].valid = true;
            }
        }

        this.setState({
            formSchema: formSchema,
            showForm: true,
            isFormEdit: true
        });
    }

    isEditDeleteEnabled = (isEdit) => {
        const { selectedFields } = this.state;
        const fields = selectedFields.filter(field => field.checked);

        return (isEdit ? fields.length === 1 : fields.length);
    }

    render() {
        const { isFetching } = this.state;

        return (
            <div className="house-maint-container">
                {isFetching ? <p>Loading</p> :
                    <div>
                        <div className="house-maint-container__action">
                            <button onClick={() => this.handleAdd()}>Add</button>
                            {this.isEditDeleteEnabled(true) ? 
                                <button onClick={() => this.handleFormEdit()}>Edit</button> : null}
                            {this.isEditDeleteEnabled() ? 
                                <button onClick={() => this.handleDelete()}>Delete</button> : null}
                        </div>
                        <TableWrapper 
                            dataSet={this.state.dataSet}
                            headerCol={HEADERS}
                            selectedFields={this.state.selectedFields}
                            handleFieldSelection={this.handleFieldSelection}
                            handleSelectAll={this.handleSelectAll}
                            isSelectAll={this.state.isSelectAll}
                        />
                        {this.state.showForm ? 
                            <FormWrapper 
                                formHandler={this.handleFormSubmit}
                                formSchema={this.state.formSchema}/> : null
                        }
                    </div>
                }
            </div>
        )
    }
}

export default HouseMaintContainer;
