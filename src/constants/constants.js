const HEADERS = [
  'Location Id',
  'House Code',
  'House Description',
  'Vendor',
  'Email Id',
  'Spot TV',
  'Spot Radio',
  'Network TV',
  'Network Radio',
  'Unwired Network'
];

const FORM_SCHEMA = {
  locationId: {
    label: 'Location Id',
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: '',
      maxLength: 3
    },
    value: '',
    validation: {
      required: true,
      maxLength: 3
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
      placeholder: '',
      maxLength: 10
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
      placeholder: '',
      maxLength: 70
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
    elementType: 'select',
    elementConfig: {
      options: [
        {
          displayValue: '--- Select ---',
          value: ''
        },
        {
          displayValue: 'COMCAST',
          value: 'COMCAST'
        },
        {
          displayValue: 'YANGAROO',
          value: 'YANGAROO'
        },
        {
          displayValue: 'SPOT GENIE',
          value: 'SPOT GENIE'
        },
        {
          displayValue: 'SPACE',
          value: 'SPACE'
        }
      ]
    },
    value: '',
    validation: {
      //required: true
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
        maxLength: 100
        //disabled: true
    },
    value: '',
    validation: {
        
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
    checked: false,
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
    checked: false,
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
    checked: false,
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
    label: 'Production Services Available',
    elementType: 'input',
    elementConfig: {
        type: 'checkbox'
    },
    value: '',
    validation: {
        //required: true
    },
    valid: false,
    touched: false
},
productionServiceDefault: {
    label: 'Production Services Default',
    elementType: 'input',
    elementConfig: {
        type: 'checkbox'
    },
    value: '',
    validation: {
        required: true
    },
    valid: false,
    touched: false
},
comment1: {
  label: 'Comment 1',
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: '',
        maxLength: 60
    },
    value: '',
    validation: {
      maxLength: 60
    },
    valid: false,
    touched: false
  },
  comment2: {
    label: 'Comment 2',
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: ''
    },
    value: '',
    validation: {
      maxLength: 60
    },
    valid: false,
    touched: false
  },
  comment3: {
    label: 'Comment 3',
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: ''
    },
    value: '',
    validation: {
      maxLength: 60
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
    validation: {}
  }
}

export {
  HEADERS,
  FORM_SCHEMA
}

