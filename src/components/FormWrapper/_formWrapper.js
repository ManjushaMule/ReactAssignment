// This is FormWrapper function Component
// Implemented for practice puprpose. 
// This is not being used anywhere.

import React from 'react';
import Input from '../Input/Input';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Pencil } from 'react-bootstrap-icons';


import './FormWrapper.scss';

//class FormWrapper extends Component {
const FormWrapper = (props) => {
  const [isError, setIsError] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [formSchema, setFormSchema] = React.useState({});

  React.useEffect((props) => {
    const { formSchema } = props;
    if (formSchema) {
        let formIsValid = true;
        for (let inputIdentifier in formSchema) {
          let field = formSchema[inputIdentifier];
          field.valid = checkValidity(field.value, field);
          formIsValid = formSchema[inputIdentifier].valid && formIsValid;
        }
        setFormSchema({...formSchema});
        setFormIsValid(formIsValid);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = {};
    if(!(formSchema.spotTV.checked || formSchema.spotRadio.checked ||
      formSchema.networkTV.checked || formSchema.networkRadio.checked)) {
      setFormIsValid(false);
      setIsError(true);
    } 
    else {
      for (let formElementIdentifier in formSchema) {
          formData[formElementIdentifier] = formSchema[formElementIdentifier].value;
      }
      props.formHandler(formData);
    }
  }

  const checkValidity = (value, formElement) => {
    let isValid = true;
    let validationSchema = formElement.validation;

    if (validationSchema.required) {
      let type = formElement.elementConfig.type;
        isValid = (type==='text' || type==='email') ? (value.trim() !== '' && isValid) : isValid;
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

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormSchema = { ...formSchema };
    const updatedFormElement = { 
        ...updatedFormSchema[inputIdentifier]
    };
    //let value;
    if(updatedFormElement.elementConfig.type === 'checkbox') {
      updatedFormElement.value = event.target.checked;
      updatedFormElement.checked = event.target.checked;
    } else {
      updatedFormElement.value = event.target.value;
    }
    
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement);
    updatedFormElement.touched = true;
    updatedFormSchema[inputIdentifier] = updatedFormElement;
    
    let formIsValid = true;
    for (let inputIdentifier in updatedFormSchema) {
        formIsValid = updatedFormSchema[inputIdentifier].valid && formIsValid;
    }
    setFormSchema(updatedFormSchema);
    setFormIsValid(formIsValid);
    setIsError(false);
  }

  const createForm = (formElementsArray) => {
    console.log("**creating form again");
    return formElementsArray.map(formElement => (
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
        changed={(event) => inputChangedHandler(event, formElement.id)} 
      />
    ));
  }

  const toggleComments = () => {
    setShowComments(!showComments);
  }

  const Comments = (props) => {
    let comments; 
    const { formElements } = props;

    if (showComments){
      comments = (
      <div className="form-wrapper__comments">
        <h6><span>Comments</span></h6>
        <Form.Row>
          <ColumnGroup elem={formElements[12]} />
        </Form.Row>
        <Form.Row>
          <ColumnGroup elem={formElements[13]} />
        </Form.Row>
        <Form.Row>
        <ColumnGroup elem={formElements[14]} />
        </Form.Row>
      </div>)
    } 
    else {
      comments = (
        <Button 
          variant="link"
          onClick={toggleComments}>
          <span>Comments <Pencil/></span>
        </Button>);
    }
    
    return comments;
  }

  const ErrorView = () => {
    let _view = null;
    if (isError) {
      _view = (<Alert  variant="danger">
        Any one media system should be selected from Spot, Network OR Both.
      </Alert>);
    }

    return _view;
  }

  const ColumnGroup = (props) => {
    return (<Form.Group as={Col}>
      {props.elem} 
    </Form.Group>)
  }

  const FooterButtons = () => {
    return (
      <div className="form-wrapper__btn-section">
        <Button variant="primary" type="submit"  disabled={!formIsValid}>
          Submit
        </Button>
        <Button variant="secondary" onClick={() => props.formHandler(false)}>
          Cancel
        </Button>
      </div>
    )
  }

  const ChecboxSection = () => {
    return (
      <div className="form-wrapper__checkbox-section">
        <h6><span>Media System</span></h6>
        <Form.Row>
          <ColumnGroup elem={formElements[5]} />
          <ColumnGroup elem={formElements[6]} />
          <ColumnGroup elem={formElements[7]} />
          <ColumnGroup elem={formElements[8]} />
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
    )
  }

  const Fields = (props) => {
    let { formElements } = props;
    return (
      <>
      <Form.Row>
          <ColumnGroup elem={formElements[0]} />
          <ColumnGroup elem={formElements[1]} />
        </Form.Row>

        <Form.Row>
          <ColumnGroup elem={formElements[2]} />
          <ColumnGroup elem={formElements[3]} />
        </Form.Row>

        <Form.Row>
          <ColumnGroup elem={formElements[4]} />
        </Form.Row>
      </>
    )
  }

  const formElementsArray = [];
  for (let key in formSchema) {
    formElementsArray.push({
      id: key,
      config: formSchema[key]
    });
  }
  const formElements = createForm(formElementsArray);

  return (
    <div className="form-wrapper">
      {console.log("I am rendering...")}
      <ErrorView />
      <Form onSubmit={handleSubmit}>
        <Fields formElements={formElements}/>

        <ChecboxSection />
            
        <Comments formElements={formElements}/>

        <FooterButtons />
        
      </Form>
    </div>
  )
};


export default FormWrapper;
