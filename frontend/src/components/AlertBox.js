/* eslint-disable react/prop-types */
import React from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function AlertBox(props) {
  const { message, show, setShow } = props;

  if (show) {
    return (
      <Alert variant={message.type} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{message.title}</Alert.Heading>
        <p>{message.text}</p>
        <Button
          onClick={() => setShow(false)}
          variant={"outline-" + message.type}
        >
          Ok!
        </Button>
      </Alert>
    );
  }
  return null;
}

export default AlertBox;
