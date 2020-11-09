import React from 'react';
import Alert from 'react-bootstrap/Alert';

import './Message.scss';

const Message = (props) => {
    const { show, message, close, type } = props;
    let msg = null;
    if (show) {
        msg = ( <Alert variant={type} onClose={close} dismissible>
            {message}
        </Alert>);
    }
    return (
        <div className="message">
            {msg}
        </div>
    );
}


export default Message;