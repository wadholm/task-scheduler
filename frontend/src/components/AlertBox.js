/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react";
import Axios from "axios";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function AlertBox(props) {
  const { message, confirm, setConfirm, show, setShow, taskId, setTaskId } = props;

  const handleClose = () => {
    setShow(false);
    // reload the page
    window.location.reload(false);
  };

  const handleCancel = () => {
    setShow(false);
  };

  const confirmDeletion = () => {
    setConfirm(false);
    setShow(false)
    Axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_ENDPOINT}/tasks/${taskId}`,
    })
      .then((res) => {
        if (res.status === 200) {
          console.info(res.data.message);
          // reload the page
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setTaskId("");
  };

  if (confirm) {
    return (
      <>
      <Modal
            // {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
      show={show} onHide={handleClose}
      >
        <Modal.Body>{message.text}</Modal.Body>
        <Modal.Footer>
        <Button variant="outline-danger" onClick={confirmDeletion}>
            Delete
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
  } else if (show) {
    return (
      <>
      <Modal
      // {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{message.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok!
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );

  }
  return null;
}

export default AlertBox;
