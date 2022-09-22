/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import DateTimePicker from "react-datetime-picker";
import "./NewForm.css";

function NewForm(props) {
  const { setAddTask, setShow, setMessage } = props;

  const [activeElementType, setActiveElementType] = useState("dropdown");
  const [validated, setValidated] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const [estDuration, setEstDuration] = useState("");

  const dropDownChanged = (event) => {
    setCategory(event.target.value);
    if (event.target.value === "custom") {
      setActiveElementType("input");
    }
  };

  const backToDropdown = () => {
    setActiveElementType("dropdown");
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setMessage({
        type: "warning",
        title: "Ops!",
        text: "Missing manditory field.",
      });
      setShow(true);
    } else {
      Axios({
        method: "POST",
        url: `${process.env.REACT_APP_ENDPOINT}/tasks`,
        data: {
          user: process.env.REACT_APP_TEST_USER,
          description: description,
          category: category,
          start_time: startTime,
          deadline: deadline,
          est_duration: estDuration,
        },
      })
        .then((res) => {
          setAddTask(false);
          if (res.status === 201) {
            setMessage({
              type: "success",
              title: "Success!",
              text: "Your task has been succecfully added.",
            });
            setShow(true);
            setValidated(false);
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
    }
    setValidated(true);
  };

  return (
    <>
    <div className="editable">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="decription">
          <Form.Label>Description</Form.Label>
          <Form.Control
           as="textarea" rows={2}
            required
            type="description"
            placeholder="Enter description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Form.Text className="text-muted">Describe task.</Form.Text>
        </Form.Group>

        {activeElementType === "dropdown" ? (
          <>
            <Form.Label>Category</Form.Label>
            <Form.Control
              className="editable"
              as="select"
              onChange={(e) => dropDownChanged(e)}
              aria-label="Default select example"
            >
              <option>Category</option>
              <option value="sales">Sales</option>
              <option value="engineering">Engineering</option>
              <option value="project">Project</option>
              <option value="daily">Daily Job</option>
              <option value="others">Others</option>
              <option value="custom">Type Your own</option>
            </Form.Control>
          </>
        ) : (
          <>
            <Form.Label>Category</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                className="editable"
                onChange={(event) => setCategory(event.target.value)}
                type="category"
                placeholder="Category"
              />
              <Button
                variant="secondary"
                id="button-addon2"
                onClick={backToDropdown}
              >
                Select
              </Button>
            </InputGroup>
          </>
        )}

        <Form.Group className="mb-3" controlId="start-time">
          <Form.Label className="date">Start-time</Form.Label>
          <DateTimePicker
            onChange={(date) => setStartTime(date)}
            value={startTime}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="deadline">
          <Form.Label className="date">Deadline</Form.Label>
          <DateTimePicker
            onChange={(date) => setDeadline(date)}
            value={deadline}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="est-duration">
          <Form.Label>Estimated duration (hours)</Form.Label>
          <Form.Control
            className="editable"
            required
            onChange={(event) => setEstDuration(event.target.value)}
            type="number"
            min="1"
            max="100"
            placeholder="Hours"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add task
        </Button>
      </Form>
      </div>
    </>
  );
}

export default NewForm;
