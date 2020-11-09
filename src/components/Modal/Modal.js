import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

const CustomModal = (props) => {
  const {show, handleClose} = props;
  
  return (
    <React.Fragment>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
        </Modal.Header>
        
        <Modal.Body>
          {props.children}
        </Modal.Body>
        
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </React.Fragment>
  );
}
  
CustomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}
export default CustomModal;