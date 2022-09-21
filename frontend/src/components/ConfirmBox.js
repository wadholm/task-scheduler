/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react";
import { Alert } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Axios from "axios";

import "./ConfirmBox.css";

function ConfirmBox(props) {
  const { message, setMessage, confirm, setConfirm, setShow, taskId, setTaskId, show2, setShow2 } = props;

  const handleClose = () => setShow2(false);

  // const confirmDeletion = () => {
  //   setConfirm(false);
  //   console.log(taskId);
  //   Axios({
  //     method: "DELETE",
  //     url: `${process.env.REACT_APP_DEV_ENDPOINT}/tasks/${taskId}`,
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setMessage({
  //           type: "success",
  //           title: "Success!",
  //           text: "Your task has been succecfully deleted.",
  //         });
  //         setShow(true);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setMessage({
  //         type: "danger",
  //         title: "Ops, something went wrong.",
  //         text: "It's not you, it's me, please try again shortly.",
  //       });
  //     });
  //   setTaskId("");
  // };

  const cancelDeletion = () => {
    setConfirm(false);
  };


  if (show2) {
    return (
      <>
      {/* <Alert variant={message.type} onClose={() => setConfirm(false)}>
        <Alert.Heading>{message.title}</Alert.Heading>
        <p>{message.text}</p>
        <Button
          className="confirm"
          onClick={confirmDeletion}
          variant={"outline-" + message.type}
        >
          Delete
        </Button>
        <Button
          className="cancel confirm"
          onClick={cancelDeletion}
          variant={"outline-" + message.type}
        >
          Cancel
        </Button>
      </Alert> */}
      <Modal show2={show2} onHide={cancelDeletion}>
        <Modal.Header closeButton>
          <Modal.Title>{message.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
  }
  return null;
}

export default ConfirmBox;
