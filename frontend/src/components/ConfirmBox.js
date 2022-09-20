/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Axios from "axios";

import "./ConfirmBox.css";

function ConfirmBox(props) {
  const { message, setMessage, confirm, setConfirm, setShow, taskId, setTaskId } = props;

  const confirmDeletion = () => {
    setConfirm(false);
    console.log(taskId);
    Axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_DEV_ENDPOINT}/tasks/${taskId}`,
    })
      .then((res) => {
        if (res.status === 200) {
          setMessage({
            type: "success",
            title: "Success!",
            text: "Your task has been succecfully deleted.",
          });
          setShow(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage({
          type: "danger",
          title: "Ops, something went wrong.",
          text: "It's not you, it's me, please try again shortly.",
        });
      });
    setTaskId("");
  };

  const cancelDeletion = () => {
    setConfirm(false);
  };



  if (confirm) {
    return (
      <Alert variant={message.type} onClose={() => setConfirm(false)} >
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
      </Alert>
    );
  }
  return null;
}

export default ConfirmBox;
