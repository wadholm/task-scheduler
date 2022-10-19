/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import BootstrapForm from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DateTimePicker from "react-datetime-picker";
import "./Form.css";

function TaskForm(props) {
  const { 
    categories, addTask, setAddTask, setShow, setMessage, setHideTable} = props;

  const today = new Date();
  // let end = today.setTime(today.getTime() + 24 * 60 * 60 * 1000);
  const [activeElementType, setActiveElementType] = useState("dropdown");
  const [validated, setValidated] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState(new Date());

  const cancelAdd = () => {
    setAddTask(false);
    setHideTable(false);
  };

  const dropDownChanged = (event) => {
    setCategory(event.target.value);
    if (event.target.value === "typeYourOwn") {
      setActiveElementType("input");
    }
  };

  const backToDropdown = () => {
    setActiveElementType("dropdown");
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    // check validation
    if (form.checkValidity() === false) {
      event.stopPropagation();
    // empty category field
    } else if (!category || category == "typeYourOwn") {
      Axios({
        method: "POST",
        url: `${process.env.REACT_APP_ENDPOINT}/tasks`,
        data: {
          user: process.env.REACT_APP_TEST_USER,
          description: description,
          // start_time: startTime,
          deadline: deadline,
          // est_duration: estDuration,
        },
      })
        .then((res) => {
          setAddTask(false);
          setHideTable(false);
          if (res.status === 201) {
            setMessage({
              type: "success",
              title: "Success!",
              text: "Your task has been succecfully added.",
            });
            setShow(true);
            // setValidated(false);
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
    } else {
        Axios.all([
          Axios({
            method: "POST",
            url: `${process.env.REACT_APP_ENDPOINT}/tasks`,
            data: {
              user: process.env.REACT_APP_TEST_USER,
              description: description,
              category: category,
              // start_time: startTime,
              deadline: deadline,
              // est_duration: estDuration,
            },
          }),
          Axios({
            method: "POST",
            url: `${process.env.REACT_APP_ENDPOINT}/categories/${process.env.REACT_APP_TEST_USER}`,
            data: {
              category: category
            },
          })
        ]).then(Axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]

            setAddTask(false);
            if (responseOne.status === 201) {
              setMessage({
                type: "success",
                title: "Success!",
                text: "Your task has been succecfully added.",
              });
              setShow(true);
              setValidated(false);
        }
        console.info(responseTwo);
      })).catch(errors => {
        console.error(errors);
        setMessage({
          type: "danger",
          title: "Ops, something went wrong.",
          text: "It's not you, it's me, please try again shortly.",
        });
      });
    }
    setValidated(true);
  };

  if (addTask) {
    return (
      <>
      <div className="editable">
        <BootstrapForm noValidate validated={validated} onSubmit={handleSubmit}>
          <BootstrapForm.Group className="mb-3" controlId="decription">
            <BootstrapForm.Label>Description</BootstrapForm.Label>
            <BootstrapForm.Control
             as="textarea" rows={2}
              required
              type="description"
              placeholder="Enter description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
              <BootstrapForm.Control.Feedback type="invalid">
              Please provide a description.
            </BootstrapForm.Control.Feedback>
            <BootstrapForm.Text className="text-muted">Describe task.</BootstrapForm.Text>
          </BootstrapForm.Group>
  
          {activeElementType === "dropdown" ? (
            <>
              <BootstrapForm.Label>Category</BootstrapForm.Label>
              <BootstrapForm.Control
                className="editable"
                as="select"
                onChange={(e) => dropDownChanged(e)}
                aria-label="Default select example"
              >
                <option value="default">Category</option>
                {categories ? (
                categories.map(cat => {
                  return (
                    <option key={cat} value={cat}>{cat}</option>
                  )
                })
              ) : (
              <>
              </>
            )}
                <option value="typeYourOwn">type your own</option>
              </BootstrapForm.Control>
            </>
          ) : (
            <>
              <BootstrapForm.Label>Category</BootstrapForm.Label>
              <InputGroup className="mb-3">
                <BootstrapForm.Control
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
  
          {/* <BootstrapForm.Group className="mb-3" controlId="start-time">
            <BootstrapForm.Label className="date">Start-time</BootstrapForm.Label>
            <DateTimePicker
              onChange={(date) => setStartTime(date)}
              // min date for start is today
              minDate={new Date()}
              maxDate={startMinTime}
              value={startTime}
            />
          </BootstrapForm.Group> */}
  
          <BootstrapForm.Group className="mb-3" controlId="deadline">
            <BootstrapForm.Label className="date">Deadline</BootstrapForm.Label>
            <DateTimePicker
              onChange={(date) => {setDeadline(date)}}
              // min date for deadline is today
              minDate={today}
              value={deadline}
            />
          </BootstrapForm.Group>
  
          {/* <BootstrapForm.Group className="mb-3" controlId="est-duration">
            <BootstrapForm.Label>Estimated duration (hours)</BootstrapForm.Label>
            <BootstrapForm.Control
              className="editable"
              onChange={(event) => setEstDuration(event.target.value)}
              type="number"
              min="1"
              max="100"
              placeholder="Hours"
            />
            <BootstrapForm.Control.Feedback type="invalid">
              Please provide an estimated duration.
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group> */}
  
          <Button variant="primary" type="submit">
            Add task
          </Button>
          <Button variant="outline-primary" type="reset" onClick={cancelAdd}>
            Cancel
          </Button>
        </BootstrapForm>
        </div>
      </>
    );
  }
  return (
    <>
    <p>Loading tasks... </p>
    </>
  );
}

export default TaskForm;
