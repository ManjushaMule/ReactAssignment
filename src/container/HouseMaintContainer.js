import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../store/actions/actions';
import { hideNotification } from '../store/actions/notificationActions';
import cloneDeep from 'lodash/cloneDeep';

import Button from 'react-bootstrap/Button';
import TableWrapper from '../components/TableWrapper/TableWrapper';
import FormWrapper from '../components/FormWrapper/FormWrapper';
import Modal from '../components/Modal/Modal';
import Loader from 'react-loader-spinner';

// import Spinner from '../components/Spinner/Spinner';
import { PlusCircle, XCircle, Pencil } from 'react-bootstrap-icons';
import { HEADERS, FORM_SCHEMA } from '../constants/constants';
import Message from '../components/Message/Message';


import './HouseMaintContainer.scss'

class HouseMaintContainer extends Component { 
  constructor(props) {
    super(props);
    const formSchema = cloneDeep(FORM_SCHEMA);
    this.state = {
      showForm: false,
      isSelectAll: false,
      isFormEdit: false,
      formSchema: formSchema
    }
  }

  componentDidMount() {
    this.props.fetchRecords();
  }

  componentDidUpdate(prevProps) {
    //Add and update record done.
    if (prevProps.isSaving && this.props.isSaving !== prevProps.isSaving) {
      if (this.props.isError) {

      } else {
        const newFormSchema = this.initializeFormSchema();
        
        this.setState({
          showForm: false,
          formSchema: newFormSchema,
          isFormEdit: false
        })
      }
    }
  }

  initializeFormSchema = () => {
    return cloneDeep(FORM_SCHEMA);
  }

  handleAdd = () => {
    const newObj = this.initializeFormSchema();
    this.setState({
        showForm: true,
        formSchema : newObj
    });
  }

  handleFormSubmit = (payload) => {
    const { isFormEdit } = this.state;
    const { addHouseMaintRecord, updateHouseMaintenanceRecord} = this.props;
    let showForm = false;
    
    if (!!payload) {
      if (isFormEdit) {
        updateHouseMaintenanceRecord(payload);
      }
      else {
        addHouseMaintRecord(payload);
      }
    }
    
    else {
      const newFormSchema = this.initializeFormSchema();
      this.setState({
        showForm: showForm,
        formSchema: newFormSchema
      });
    }
    
    //Clean the values of formSchema
    //this.initializeFormSchema();
  }

  handleDelete = () => {
    const { selectedFields } = this.props;
    const { isSelectAll } = this.state;
      
    let payloadIds = [];
    if (isSelectAll) {
      this.setState({isSelectAll: !isSelectAll});
      this.props.deleteHouseMaintRecords();
    }
    else {
      for (let field in selectedFields) {
        if(selectedFields[field].checked) {
            payloadIds.push(selectedFields[field].data.firebaseKey);
        }
      }
      
      if(payloadIds.length) {
        this.props.deleteSelectedHouseMaintRecords(payloadIds);
      }
    }
  }

  handleSelectAll = (isSelectAll) => {
    const {selectedFields, dataSet} = this.props;
    let newFields;

    if(isSelectAll) {
      newFields = selectedFields.map((f, index) => {
        return {
          checked: true,
          data: dataSet[index],
          locId: dataSet[index].locationId
        }   
      });
    }
    else { 
      newFields = selectedFields.map((f) => {
        return {
          checked: false
        }
      }); 
    }
    
    this.setState({
      isSelectAll: isSelectAll
    });
    
    this.props.updateSelectedFields(newFields);
    
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
    let newFields = [...this.props.selectedFields];
    newFields[index] = {
      checked: !newFields[index].checked,
      data: item,
      locId: item.locationId
    }
    
    const isAll = this.isAllFieldsSelected(newFields);
    
    this.setState({
      isSelectAll: isAll
    });
    
    this.props.updateSelectedFields(newFields);
  }
    
  handleFormEdit = () => {
    const selectedFields = [...this.props.selectedFields];
    const formSchema = {...this.state.formSchema}
    
    const field = selectedFields.find(f => {
      return f.checked === true
    });

    const rowData = field.data;
    
    for(let key in rowData) {
      if(!!formSchema[key]) {
        formSchema[key].value = rowData[key];
        formSchema[key].checked = rowData[key];
        formSchema[key].valid = true;
      }
    }
    formSchema["locationId"].elementConfig.disabled = true;
    formSchema["houseCode"].elementConfig.disabled = true;
    formSchema["vendor"].elementConfig.disabled = true;

    this.setState({
      formSchema: formSchema,
      showForm: true,
      isFormEdit: true
    });
  }

  isEditDeleteEnabled = (isEdit) => {
    const {selectedFields, dataSet} = this.props;
    const fields = selectedFields.filter(field => field.checked);

    return (isEdit ? fields.length === 1 : fields.length);
  }

  handleModalClose = () => {
    const newFormSchema = this.initializeFormSchema();
    this.setState({
        showForm: false,
        formSchema: newFormSchema
    });
  }

  renderActionPanel = (dataSet) => {
    return (
      <div className="house-maint-container__action">
        <Button
          className="house-maint-container__action--btn"
          onClick={() => this.handleAdd()}
        >
          <PlusCircle />
          <span className="house-maint-container__action--text">Add</span>
        </Button>

        <Button
          className="house-maint-container__action--btn" 
          disabled={!this.isEditDeleteEnabled(true)}  
          onClick={() => this.handleFormEdit()}
        >
            <Pencil />
            <span className="house-maint-container__action--text">Edit</span>
        </Button>

        <Button
          className="house-maint-container__action--btn" 
          disabled={!this.isEditDeleteEnabled()}  
          onClick={() => this.handleDelete()}
        >
          <XCircle />
          <span className="house-maint-container__action--text">Delete</span>
        </Button>
    </div>
    );
  }

  renderTable = (dataSet, selectedFields) => {
    let table = "no records";
    if(dataSet.length) {
      table = (<TableWrapper 
          dataSet={dataSet}
          headerCol={HEADERS}
          selectedFields={selectedFields}
          handleFieldSelection={this.handleFieldSelection}
          handleSelectAll={this.handleSelectAll}
          isSelectAll={this.state.isSelectAll}
      />)
    }

    return table;
  }

  renderLoader = () => {
    return (
      <div className="house-maint-container__loader">
        <Loader 
          type="Puff"
          color="#f5ac00"
          height={100}
          width={100}/>
      </div>
    )
  }

  
  render() {
    const { 
      dataSet, 
      isLoading, 
      selectedFields, 
      isSaving, 
      notificationType, 
      showNotification, 
      hideNotification 
    } = this.props;
    
    return (
        <div className="house-maint-container">
            <Message show={showNotification} 
              message={this.props.message} 
              type={notificationType}
              close={hideNotification}
            />
            {isLoading ? this.renderLoader():
              <div>
                {this.renderActionPanel(dataSet)}
                
                {this.renderTable(dataSet, selectedFields)}
                
                <Modal show={this.state.showForm} handleClose={this.handleModalClose}>
                  <FormWrapper
                    formHandler={this.handleFormSubmit}
                    formSchema={this.state.formSchema}
                    isSaving={isSaving}
                  />
                </Modal>
              </div>
            }
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataSet: state.reducer.dataSet,
    selectedFields: state.reducer.selectedFields,
    isLoading: state.reducer.isLoading,
    isSaving: state.reducer.isSaving,
    isError: state.reducer.isError,
    message: state.notificationReducer.message,
    showNotification: state.notificationReducer.showNotification,
    notificationType: state.notificationReducer.type
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchRecords: () => dispatch(actions.fetchHouseMaintenanceRecords()),
    updateSelectedFields: (newFields) => dispatch(actions.updateSelectedFields(newFields)),
    updateHouseMaintenanceRecord: (payload) => dispatch(actions.updateHouseMaintenanceRecord(payload)),
    addHouseMaintRecord: (payload) => dispatch(actions.addHouseMaintRecord(payload)),
    deleteHouseMaintRecords: () => dispatch(actions.deleteHouseMaintRecords()),
    deleteSelectedHouseMaintRecords: (ids) => dispatch(actions.deleteSelectedHouseMaintRecords(ids)),
    hideNotification: () => dispatch(hideNotification())
  }
}

HouseMaintContainer.propTypes = {
  addHouseMaintRecord: PropTypes.func.isRequired,
  dataSet: PropTypes.array.isRequired,
  deleteHouseMaintRecords: PropTypes.func.isRequired,
  deleteSelectedHouseMaintRecords: PropTypes.func.isRequired,
  fetchRecords: PropTypes.func.isRequired,
  hideNotification: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  isSaving: PropTypes.bool,
  message: PropTypes.string,
  notificationType: PropTypes.string,
  selectedFields: PropTypes.array.isRequired,
  showNotification: PropTypes.bool,
  updateHouseMaintenanceRecord: PropTypes.func.isRequired,
  updateSelectedFields: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseMaintContainer);