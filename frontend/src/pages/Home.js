import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import view from "../img/view.jpg";
import "./Home.css";
import { Alert } from "react-bootstrap";
import NewForm from "../components/NewForm";
import AlertBox from "../components/AlertBox";

const Home = () => {
  const [addTask, setAddTask] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    title: "",
    text: "",
  });
  const onButtonClick = () => {
    setAddTask(true);
  };

  return (
    <>
    <style type="text/css">
      {`
  .App {
    background: #fff;
  }
  .btn-primary {
    background-color: #4643f8;
    --bs-btn-border-color: #4643f8;
    --bs-btn-hover-bg: #0000f9;
    color: white;
  }
.alert-secondary {
    --bs-alert-color: #41464b;
    --bs-alert-bg: #e6ebfe;
    --bs-alert-border-color: #bdcffc;
  }
.alert-dismissible {
  padding: 1.5rem 3rem;
}
  `}
    </style>
    <Container className="p-3 grid wrapper">
      <AlertBox message={message} show={show} setShow={setShow} />
      {addTask ? (
        <Alert className="task-adder" variant="secondary" onClose={() => setAddTask(false)} dismissible>
        <NewForm setAddTask={setAddTask} setMessage={setMessage} show={show} setShow={setShow} />
        </Alert>
      ) : (
        <>
        <div className="p-wrapper"><p>Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.</p></div>
        <div className="btn-wrapper"><Button variant="primary" onClick={onButtonClick}>Add new task</Button></div>
        </>
      )}
      <img src={view} alt="view" />
    </Container>
    </>
  );
};

export default Home;
