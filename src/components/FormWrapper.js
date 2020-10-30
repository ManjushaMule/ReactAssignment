import React,  {Component} from 'react';
import Input from './Input/Input';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

class FormWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
        isloading: false,
        formIsValid: false
    }
  }

  componentDidMount () {
    const {formSchema} = this.props;
    if (formSchema) {
        let formIsValid = true;
        for (let inputIdentifier in formSchema) {
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

    this.setState({isloading: true});

    const formData = {};
    const {formSchema} = this.state;
    for (let formElementIdentifier in formSchema) {
        formData[formElementIdentifier] = formSchema[formElementIdentifier].value;
    }

    this.props.formHandler(formData);
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
    if(updatedFormElement.elementConfig.type === 'text' || updatedFormElement.elementConfig.type === 'email') {
      updatedFormElement.value = event.target.value;
    } else {
      updatedFormElement.value = event.target.checked;
      updatedFormElement.checked = event.target.checked;
    }
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement);
    updatedFormElement.touched = true;
    updatedFormSchema[inputIdentifier] = updatedFormElement;
    
    let formIsValid = true;
    for (let inputIdentifier in updatedFormSchema) {
        formIsValid = updatedFormSchema[inputIdentifier].valid && formIsValid;
    }
    this.setState({formSchema: updatedFormSchema, formIsValid: formIsValid});
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

  render() {
    const formElementsArray = [];
    for (let key in this.state.formSchema) {
        formElementsArray.push({
            id: key,
            config: this.state.formSchema[key]
        });
    }

    let form = (
        <form onSubmit={this.handleSubmit}>
            {formElementsArray.map(formElement => {
                return (
                <Input 
                    key={formElement.id}
                    label={formElement.config.label}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                )}
            )}
            {/* <Button btnType="Success" disabled={!this.state.formIsValid}>Add</Button> */}
            <button disabled={!this.state.formIsValid}>Save</button>
            <button onClick={() => this.props.formHandler(false)}>Cancel</button>
        </form>
    );


    const formElements = this.createForm(formElementsArray);
    return (
      // <div className="form-wrapper">
      //    {this.state.loading ? "Loading" : form} 
      // </div>
      <div className="form-wrapper">
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              {formElements[0]}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              {/* <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" /> */}
              {formElements[1]}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                  {/* <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" /> */}
                  {formElements[2]}
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                  {/* <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" /> */}
                  {formElements[3]}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                  {/* <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" /> */}
                  {formElements[4]}
              </Form.Group>
            </Form.Row>
            
            <Form.Row>
              <Form.Group as={Col} controlId="formHorizontalCheck">
                {formElements[5]}
              </Form.Group>
              <Form.Group as={Col} >
                {formElements[6]}
              </Form.Group>
              <Form.Group as={Col} >
                {formElements[7]}
              </Form.Group>
              <Form.Group as={Col} >
                {formElements[8]}
              </Form.Group>
              <Form.Group as={Col} >
                {formElements[9]}
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formHorizontalCheck">
                {formElements[10]}
              </Form.Group>
              {/* <Form.Group as={Row} >
                {formElements[11]}
              </Form.Group> */}
            </Form.Row>
            
            <Form.Row>
              <Form.Group as={Col} controlId="formHorizontalCheck">
                {formElements[11]}
              </Form.Group>
            </Form.Row>


            <Button variant="primary" type="submit"  disabled={!this.state.formIsValid}>
                Submit
            </Button>
            <Button variant="secondary" onClick={() => this.props.formHandler(false)}>
                Cancel
            </Button>
        </Form>
        </div>
    )
  }
}

export default FormWrapper