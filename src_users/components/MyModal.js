import React,{ Component } from "react";
import { Button,Modal } from "react-bootstrap";

export default function MyModal(props){

  const { showModal,title,onClose,onAccept,body }= props;

  return(
    <div className="my-modal">
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Weeks evaluation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {body}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
          <Button bsStyle="primary" onClick={onAccept}>Accept</Button>
        </Modal.Footer>

      </Modal>
    </div>
  )
  
}

