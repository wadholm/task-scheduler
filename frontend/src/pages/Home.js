import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import work from "../img/work.png";
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
    <Container className="p-3">
      <h1 className="header">Task Scheduler Home</h1>
      <AlertBox message={message} show={show} setShow={setShow} />
      {addTask ? (
        <Alert className="task-adder" variant="secondary" onClose={() => setAddTask(false)} dismissible>
        <NewForm setAddTask={setAddTask} setMessage={setMessage} show={show} setShow={setShow} />
        </Alert>
      ) : (
        <>
        <Button onClick={onButtonClick}>Add new task</Button>
        <img src={work} alt="work" />
        </>
      )}
    </Container>
  );
};

export default Home;
