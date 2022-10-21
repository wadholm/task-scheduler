/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import BootstrapForm from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import moment from 'moment';
import "./Form.css";

function TaskForm(props) {
  const { 
    setShow, setMessage, scheduleTask, setScheduleTask,
    taskId, setHideTable, years, today, tomorrow, capacity} = props;

  const [ showModal, setShowModal] = useState(false);
  const [ modalMessage, setModalMessage] = useState({
    text: "",
    details: ""
  });
  const [validated, setValidated] = useState(false);
  const [startTime, setStartTime] = useState(new Date(today));
  const [deadline, setDeadline] = useState(new Date(tomorrow));
  const [estDuration, setEstDuration] = useState(0);
  const [currentYear, setCurrentYear] = useState("");
  const [currentWeek, setCurrentWeek] = useState("");
  const [newCapacity, setNewCapacity] = useState("");
  const capacityRef = useRef("");
  const yearRef = useRef("");
  const weekRef = useRef("");
  const min = 1;
  const max = 40;

  useEffect(() => {
    console.log('Fruit', newCapacity);
  }, [newCapacity])

  useEffect(() => {
    setNewCapacity(capacityRef.current);
  });

  const handleChange = event => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setEstDuration(value);
  };

  const handleClose = () => {
    setShowModal(false);
    // reload the page
    // window.location.reload(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  if (taskId) {
    useEffect(() => {
      Axios({
        method: "GET",
        url: `${process.env.REACT_APP_ENDPOINT}/tasks/${taskId}`,
      })
        .then((res) => {
          res.data.task.start_time ? setStartTime(new Date(res.data.task.start_time)) : setStartTime(new Date(today))
          res.data.task.deadline ? setDeadline(new Date(res.data.task.deadline)) : setDeadline(new Date(tomorrow))
          res.data.task.est_duration ? setEstDuration(res.data.task.est_duration) : setEstDuration("")
        })
        .catch((error) => {
          console.error(error);
        });
  }, [taskId]);
  }

  const weekToDate = (year, week) => {
    console.log("Year: " + year + " Week: " + week);
    const days = 4 + 7 * (week - 1);
    const date = new Date(year, 0, days);
    const dayOfWeek = 1 // monday
    date.setDate(date.getDate() - date.getDay() + dayOfWeek) 
    console.log("Next possible date: " + date.toLocaleDateString());
    // update start time
    setStartTime(date);
    setDeadline(date);
    let end = date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    console.log(new Date(end));

    // hide modal
    setShowModal(false);
    return date;
  }

  const checkCapacity = () => {
    let week = currentWeek;

    let capacityLeft = 0;
    while (capacityLeft - estDuration < 0) {
      week++;
      capacityLeft = currentYear.weeks[week].capacity_left;
    }
    let nextPossibleWeek = week + 1;
    weekToDate(currentYear.year, nextPossibleWeek);
    // getDateOfISOWeek(year.year, nextPossibleWeek);
    // console.log("Next possible week: " + nextPossibleDate);
  }

  const testSchedule = () => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
      // empty field
      } else {
      let capacityLeft;
      event.preventDefault();
      // add check for capacity
      // console.log(startTime);
      let startYear = moment(startTime).year();
      yearRef.current = startYear;
      let endYear = moment(deadline).year();
      let startWeek = moment(startTime).week();
      weekRef.current = startWeek;
      let endWeek = moment(deadline).week();
      // console.log(startYear  + " " + startWeek);
      // console.log(endYear + " " + endWeek);
      // console.log(capacity);
      let currentWeek = startWeek - 1;
      let lastWeek = endWeek - 1;



      // same year, start here
      if (startYear == endYear) {
        // same week, start here
        if (startWeek == endWeek) {
          years.forEach(year => {
            // get capacity left for week
            if (year.year == startYear) {

              capacityLeft = year.weeks[currentWeek].capacity_left;
              let number = capacityLeft - estDuration;
              setNewCapacity(number);
              console.log(newCapacity);
              capacityRef.current = number;
              console.log("Capacity left: " + capacityLeft);
              if (capacityLeft - estDuration < 0) {
                setCurrentWeek(currentWeek);
                setCurrentYear(year);
                number = capacityLeft - estDuration;
                setModalMessage({
                  text: "Weekly capacity is full, how would you like to proceed?",
                  details: `Weekly capacity exceeded with + ${Math.abs(number)} hours`
                });
                setShowModal(true);
                // if yes, schedule anyways
                // else get next possible time
                // checkCapacity(year, currentWeek);
              } else {
                // schedule task
                handleSchedule();
              }
            }
          });

        } else {
          console.log("Task spanning multiple weeks");
          years.forEach(year => {
            // get capacity left for week
            if (year.year == startYear) {
              // lopp through weeks
              for (let i = currentWeek; i <= lastWeek; i++) {
                console.log(i);
                console.log(lastWeek);
                capacityLeft = year.weeks[i].capacity_left;
                setNewCapacity(capacityLeft - estDuration);
                capacityRef.current = number;
                console.log("Capacity left: " + capacityLeft);
                if (capacityLeft - estDuration < 0) {
                setCurrentWeek(currentWeek);
                setCurrentYear(year);
                let number = capacityLeft - estDuration;
                setModalMessage({
                  text: "Weekly capacity is full, how would you like to proceed?",
                  details: `Weekly capacity exceeded with + ${Math.abs(number)} hours`
                });
                setShowModal(true);
                break;
                // if yes, schedule anyways
                // else get next possible time
                // checkCapacity(year, currentWeek);
              } else if (i == lastWeek) {
                // check next week
                console.log("time to schedule end of loop");
                // schedule task
                capacityRef.current = number;
                console.log(newCapacity);
                handleSchedule();
                break;
              } else {
                console.log("time to schedule");
                // schedule task
                capacityRef.current = number;
                console.log(newCapacity);
                handleSchedule();
                break;
              }
              }
            }
          });
        }
      }
    }
    setValidated(true);
  }


  const handleSchedule = () => {
    console.log(yearRef.current);
    console.log(weekRef.current);
    console.log(capacityRef.current);
      // // add check for capacity
      // console.log(moment(startTime).year());
      // // years.forEach(year => {
      // //   console.log(year);
      // // });

      // add update capacity_left per week also

      
        Axios.all([
          // update task
          Axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_ENDPOINT}/tasks/${taskId}`,
            data: [
              // {"propName": "description", "value": description},
              // {"propName": "category", "value": ""},
              {"propName": "start_time", "value": startTime},
              {"propName": "deadline", "value": deadline},
              {"propName": "est_duration", "value": estDuration},
              {"propName": "state", "value": "scheduled"}
            ],
          }),
          //update capacity_left
          Axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_ENDPOINT}/users/capacity/${process.env.REACT_APP_TEST_USER}`,
            data: {
              year: yearRef.current,
              week: weekRef.current,
              capacity_left: capacityRef.current
            },
          })
        ]).then(Axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]

            setScheduleTask(false);
            setHideTable(false);
            if (responseOne.status === 200) {
              setMessage({
                type: "success",
                title: "Success!",
                text: "Your task has been succecfully scheduled.",
              });
              setShow(true);
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
  };

if (scheduleTask) {
    return (
      <>
      <Modal
      // {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal} onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{modalMessage.text}</div>
          <div>{modalMessage.details}</div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="outline-primary" onClick={handleSchedule}>
            Schedule anyways
          </Button>
          <Button variant="primary" onClick={checkCapacity}>
            Get next possible start date
          </Button>
        </Modal.Footer>
      </Modal>
        
      <div className="editable">
        <BootstrapForm noValidate validated={validated} onSubmit={testSchedule} >
          <BootstrapForm.Group className="mb-3" controlId="start-time">
            <BootstrapForm.Label className="date">Start-time</BootstrapForm.Label>
            <DateTimePicker
              onChange={(date) => setStartTime(date)}
              // min date for start is today
              minDate={today}
              maxDate={deadline}
              value={startTime}
              disableClock={true}
              format="y-MM-dd"
              
            />
            <BootstrapForm.Control.Feedback type="invalid">
              Please provide a start time.
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>
  
          <BootstrapForm.Group className="mb-3" controlId="deadline">
            <BootstrapForm.Label className="date">Deadline</BootstrapForm.Label>
            <DateTimePicker
              onChange={(date) => {setDeadline(date)}}
              // min date for deadline is start time
              minDate={startTime}
              value={deadline}
              disableClock={true}
              format="y-MM-dd"
            />
          </BootstrapForm.Group>
  
          <BootstrapForm.Group className="mb-3" controlId="est-duration">
            <BootstrapForm.Label>Estimated duration (hours)</BootstrapForm.Label>
            <BootstrapForm.Control
              className="editable"
              onChange={handleChange}
              type="number"
              min="1"
              max="40"
              placeholder="Hours"
              value={estDuration}
              required
            />
            <BootstrapForm.Text className="text-muted">
            In prototype, maximum duration is 40 hours. 
            </BootstrapForm.Text>
            <BootstrapForm.Control.Feedback type="invalid">
              Please provide an estimated duration.
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>
          <Button variant="primary" type="submit">
            Schedule task
          </Button>
          <Button variant="outline-primary" type="reset" onClick={() => {setScheduleTask(false), setHideTable(false)}}>
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
