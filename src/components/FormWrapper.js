import React,  {Component} from 'react';
import Input from './Input/Input';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Pencil } from 'react-bootstrap-icons';


import './FormWrapper.scss';

class FormWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isloading: false,
      formIsValid: false,
      formSchema: {},
      showComments: false,
      isError: false
    }
  }

  componentDidMount () {
    const {formSchema} = this.props;
    if (formSchema) {
        let formIsValid = true;
        for (let inputIdentifier in formSchema) {
          let field = formSchema[inputIdentifier];
          field.valid = this.checkValidity(field.value, field);
          formIsValid = formSchema[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            formSchema: {...formSchema},
            formIsValid: formIsValid
        })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = {};
    const {formSchema} = this.state;
    
    //Validation-- at least any of the TV/Radio should be selected
    if(!(formSchema.spotTV.checked || formSchema.spotRadio.checked ||
      formSchema.networkTV.checked || formSchema.networkRadio.checked)) {
      
      this.setState({
        formIsValid: false,
        isError: true
      });
    } 
    else {
      this.setState({isloading: true});

      for (let formElementIdentifier in formSchema) {
          formData[formElementIdentifier] = formSchema[formElementIdentifier].value;
      }

      this.props.formHandler(formData);
    }
  }

  checkValidity = (value, formElement) => {
    let isValid = true;
    let validationSchema = formElement.validation;

    if (validationSchema.required) {
      let type = formElement.elementConfig.type;
        isValid = (type=='text' || type==='email') ? (value.trim() !== '' && isValid) : isValid;
    }

    if (validationSchema.minLength) {
        isValid = value.length >= validationSchema.minLength && isValid
    }

    if (validationSchema.maxLength) {
        isValid = value.length <= validationSchema.maxLength && isValid
    }

    if (validationSchema.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormSchema = {
        ...this.state.formSchema
    };
    const updatedFormElement = { 
        ... updatedFormSchema[inputIdentifier]
    };
    //let value;
    if(updatedFormElement.elementConfig.type === 'checkbox') {
      updatedFormElement.value = event.target.checked;
      updatedFormElement.checked = event.target.checked;
    } else {
      updatedFormElement.value = event.target.value;
    }
    
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement);
    updatedFormElement.touched = true;
    updatedFormSchema[inputIdentifier] = updatedFormElement;
    
    let formIsValid = true;
    for (let inputIdentifier in updatedFormSchema) {
        formIsValid = updatedFormSchema[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      formSchema: updatedFormSchema,
      formIsValid: formIsValid,
      isError: false
    });
  }

  createForm = (formElementsArray) => {
    return formElementsArray.map(formElement => {
        //let row = formElement.hasRowParent ? <div className="row"> : null;
        return (
            <Input 
            key={formElement.id}
            label={formElement.config.label}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            checked={formElement.config.checked}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        )
    })
  }

  toggleComments = () => {
    const {showComments} = this.state;
    this.setState({
      showComments: !showComments
    })
  }

  renderCommentSection(formElements) {
    let comments; 
    if (this.state.showComments){
      comments = (<div className="form-wrapper__comments">
        <h6><span>Comments</span></h6>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridComment1">
            {/* Comment 1 */}
            {formElements[12]} 
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridComment2">
            {/* Comment 2 */}
            {formElements[13]} 
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridComment3">
            {/* Comment 3 */}
            {formElements[14]} 
          </Form.Group>
        </Form.Row>
      </div>)
    } 
    else {
      comments = (<Button 
        variant="link"
        onClick={() => this.toggleComments()}>
         <span>Comments <Pencil/></span>
      </Button>)
    }
    
    return comments;
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.formSchema) {
        formElementsArray.push({
            id: key,
            config: this.state.formSchema[key]
        });
    }
    const formElements = this.createForm(formElementsArray);
    return (
      // <div className="form-wrapper">
      //    {this.state.loading ? "Loading" : form} 
      // </div>
      
      <div className="form-wrapper">
        {this.state.isError ? <Alert  variant="danger">
          Any one media system should be selected from Spot, Network OR Both.
        </Alert>  : null}
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridLocId">
              {/* Location Id */}
              {formElements[0]} 
            </Form.Group>
            <Form.Group as={Col} controlId="formGridHouseId">
              {/* House code */}
              {formElements[1]}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridHouseDesc">
                {/* House Description */}
                {formElements[2]}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridVendor">
                {/* Vendor */}
                {formElements[3]}
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                  {/* Email */}
                  {formElements[4]}
              </Form.Group>
            </Form.Row>
            
            <div className="form-wrapper__checkbox-section">
              <h6><span>Media System</span></h6>
              <Form.Row>
                <Form.Group as={Col}>
                  {/* Spot Tv */}
                  {formElements[5]}
                </Form.Group>
                <Form.Group as={Col} >
                  {/* Spot Radio */}
                  {formElements[6]}
                </Form.Group>
                <Form.Group as={Col} >
                  {/* Network TV */}
                  {formElements[7]}
                </Form.Group>
                <Form.Group as={Col} >
                  {/* Network Radio */}
                  {formElements[8]}
                </Form.Group>
              </Form.Row>

              <Row>
                <Col xs={12} md={4}>
                  {formElements[10]}
                </Col>
                <Col xs={6} md={4}>
                  {formElements[11]}
                </Col>
                <Col xs={6} md={4}>
                  {formElements[9]}
                </Col>
              </Row>
            </div>
            
            {this.renderCommentSection(formElements)}

            <div className="form-wrapper__btn-section">
              <Button variant="primary" type="submit"  disabled={!this.state.formIsValid}>
                  Submit
              </Button>
              <Button variant="secondary" onClick={() => this.props.formHandler(false)}>
                  Cancel
              </Button>
            </div>
        </Form>
        </div>
    )
  }
}

export default FormWrapper