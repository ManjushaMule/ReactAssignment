import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

import './Message.scss';

const Message = (props) => {
    const { show, message, close, type, isDismissible } = props;
    let msg = null;
    let dismissible = isDismissible ? "dismissible" : "";
    if (show) {
        msg = ( <Alert variant={type} onClose={close} dismissible={dismissible}>
            {message}
        </Alert>);
    }
    return (
        <div className="message">
            {msg}
        </div>
    );
}

Message.propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string,
    close: PropTypes.func,
    type: PropTypes.string,
    isDismissible: PropTypes.bool
}

export default Message;