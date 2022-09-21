/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Axios from "axios";

function AlertBox(props) {
  const { message, confirm, setConfirm, show, setShow, taskId, setTaskId } = props;

  const handleClose = () => setShow(false);

  const confirmDeletion = () => {
    setConfirm(false);
    setShow(false)
    Axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_DEV_ENDPOINT}/tasks/${taskId}`,
    })
      .then((res) => {
        if (res.status === 200) {
          console.info(res);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setTaskId("");
  };

  // const cancelDeletion = () => {
  //   setConfirm(false);
  // };

  if (confirm) {
    return (
      <>
      <Modal
            {...props}
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
          <Button variant="danger" onClick={handleClose}>
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
      {...props}
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
