/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import MyScheduler from "../components/Scheduler";
import Axios from "axios";
const stc = require('string-to-color');


import "./Timeline.css";

const Timeline = () => {
  const [task, setTask] = useState("HEJ");
  // const [data, setData] = useState([]);
  // const [scheduledTasks, setScheduledTasks] = useState([]);
  // const [sortedTasks, setSortedTasks] = useState([]);
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_ENDPOINT}/tasks/user/${process.env.REACT_APP_TEST_USER}`,
    })
      .then((res) => {
        let scheduled = [];
        // setData(res.data.tasks);
        res.data.tasks.forEach(task => {
        // start_time and est_duration?
        if (task.start_time) {
          scheduled.push(task);
        }
        });

        let sorted = scheduled.sort((a,b) => Date.parse(new Date(a.start_time)) - Date.parse(new Date(b.start_time)));
        let reso = [];
        let ev = [];
        sorted.forEach(task => {
          reso.push({
            id: task._id,
            name: task.description
          });
          ev.push({
            id: task._id,
            start: task.start_time, // start_time
            end: task.deadline, // deadline
            resourceId: task._id, // task id?
            title: task.description, // estimated duration?
            viewEventText: task.est_duration,
            bgColor: stc(task.category),
            resizable: false,
            movable: false
          })
        })
        setResources(reso);
        setEvents(ev);
      })
      .catch((error) => {
        console.error(error);
      });
}, []);

  if (resources.length > 0 && events.length > 0) {
    return (
      <>
      <style type="text/css">
        {`
        .container {
          max-width: 95%;
        }
      `}
      </style>
      <Container className="p-3 grid wrapper">
      <div className="header-wrapper">
      <h1 className="header">Timeline</h1>
      <MyScheduler task={task} setTask={setTask}
        resources={resources} events={events}
        />
      </div>
      </Container>
      </>
    );

  }
  return (
    <>
    <style type="text/css">
      {`
      .container {
        max-width: 95%;
      }
    `}
    </style>
    <Container className="p-3 grid wrapper">
    <div className="header-wrapper">
    <h1 className="header">Timeline</h1>
      <p>No tasks to show...</p>
      <MyScheduler task={task} setTask={setTask}
        resources={resources} events={events}
        show={show} setShow={setShow}
        />
    </div>
    </Container>
    </>
  );
};

export default Timeline;
