import React from 'react';

import './Input.scss';

const input = ( props ) => {
    let inputElement = null;
    let ele = null;
    const inputClasses = ['InputElement'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            (props.elementConfig.type === "checkbox") && inputClasses.push('InputCheckbox');
            if(props.elementConfig.type === "checkbox" && props.checked) {
                inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                checked={props.checked} />;
            } else {
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            }
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    {...props.elementConfig}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} 
            />;
    }

    ele = (<div className={"Input"}>
        <label className={'Label'}>{props.label}</label>
        {inputElement}
    </div>);

    if(props.elementConfig.type === 'checkbox') {
      ele = ( 
        <div className={"Input"}>
          {/* {inputElement} */}
          <label className={'Label'}>{props.label}{inputElement}</label>
        </div>
      );
    }
    return (
    <React.Fragment>
        {ele}
    </React.Fragment>
    );

};

export default input;