/* eslint-disable no-undef */
import React, { useEffect, useState, useMemo } from "react";
import Axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "../components/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import AlertBox from "../components/AlertBox";
import { Alert } from "react-bootstrap";
import TaskForm from "../components/Forms/TaskForm";
import AddTaskForm from "../components/Forms/AddTaskForm";
import { SelectColumnFilter } from "../components/Filter";
import "./List.css";

const List = () => {
  const [data, setData] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [categories, setCategories] = useState("");
  const [taskId, setTaskId] = useState("");
  const [show, setShow] = useState(false);
  const [hideTable, setHideTable] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [scheduleTask, setScheduleTask] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    title: "",
    text: "",
  });

  useEffect(() => {
      Axios({
        method: "GET",
        url: `${process.env.REACT_APP_ENDPOINT}/tasks/user/${process.env.REACT_APP_TEST_USER}`,
      })
        .then((res) => {
          setData(res.data.tasks);
        })
        .catch((error) => {
          console.error(error);
        });
      Axios({
        method: "GET",
        url: `${process.env.REACT_APP_ENDPOINT}/users/${process.env.REACT_APP_TEST_USER}`,
      })
        .then((res) => {
          setCategories(res.data.user.categories);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Description',
        accessor: 'description', // accessor is the "key" in the data
      },
      {
        Header: 'State',
        accessor: 'state',
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: 'Category',
        accessor: 'category',
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: 'Start',
        accessor: 'start_time',
        Filter: SelectColumnFilter,
        filter: "includes",
        // eslint-disable-next-line react/prop-types, react/display-name
        // Cell: props => <FontAwesomeIcon  onClick={() => clickedScheduleTask(props)} icon={icon({name: 'clock', style: 'solid'})} />,
        Cell: ( props ) => {
          // eslint-disable-next-line react/prop-types
          if (props.value) {
            // eslint-disable-next-line react/prop-types
            let date = new Date(props.value)
            return date.toLocaleDateString()
          }
          return <FontAwesomeIcon className="clock"  onClick={() => clickedScheduleTask(props)} icon={icon({name: 'clock', style: 'solid'})} />
         }
      },
      {
        Header: 'Deadline',
        accessor: 'deadline',
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      // {
      //   Header: 'Schedule',
      //   accessor: 'schedule', // accessor is the "key" in the data,
      //   disableFilters: true,
      //   Cell: props => <FontAwesomeIcon  onClick={() => clickedScheduleTask(props)} icon={icon({name: 'clock', style: 'solid'})} />
      // },
      {
        Header: 'Edit',
        accessor: 'edit', // accessor is the "key" in the data,
        disableFilters: true,
        Cell: props => <FontAwesomeIcon  onClick={() => clickedEditTask(props)} icon={icon({name: 'pen-to-square', style: 'solid'})} />
      },
      {
        Header: 'Delete',
        accessor: 'delete', // accessor is the "key" in the data,
        disableFilters: true,
        Cell: props => <FontAwesomeIcon  onClick={() => deleteTask(props)} icon={icon({name: 'trash', style: 'solid'})} />
      },
    ],
    []
  )

  const clickedEditTask = (cell) => {
    const id = cell?.row?.original._id;
    setTaskId(id);
    setEditTask(true);
    setHideTable(true);
}

const clickedScheduleTask = (cell) => {
  console.log(cell);
  const id = cell?.row?.original._id;
  console.log("Schedule :" + id);
  setTaskId(id);
  setScheduleTask(true);
  setHideTable(true);
}

const deleteTask = (cell) => {
  const id = cell?.row?.original._id;

  setTaskId(id);
  setConfirm(true);
  setShow(true);

  setMessage({
    type: "danger",
    title: "Delete task!",
    text: "Are you sure you want to delete this task?",
  });
}

  return (
  <>
  <style type="text/css">
    {`
    .input-group .btn {
      z-index: 1;
    }
  `}
  </style>
  <Container className="p-3 grid wrapper">
  <div className="header-wrapper">
    <h1 className="header">Tasks</h1>
    </div>
    <Container className="main-wrapper">
    <AlertBox
    message={message} setMessage={setMessage}
    show={show} setShow={setShow}
    confirm={confirm} setConfirm={setConfirm}
    taskId={taskId} setTaskId={setTaskId}
    setHideTable={setHideTable}
    />
      {hideTable ? (
        <>
        {addTask ? (
        <>
        <Alert className="task-adder" variant="secondary" onClose={() => {setAddTask(false), setHideTable(false)}} dismissible>
        <AddTaskForm categories={categories} addTask={addTask} setAddTask={setAddTask} setMessage={setMessage} show={show} setShow={setShow} setHideTable={setHideTable} />
        </Alert>
        </>
      ) : (
        <>
        {editTask ? (
        <>
        <Alert className="task-editor" variant="secondary" onClose={() => {setEditTask(false), setHideTable(false)}} dismissible>
        <TaskForm editTask={editTask} setEditTask={setEditTask} taskId={taskId} setMessage={setMessage} show={show} setShow={setShow} setHideTable={setHideTable} categories={categories} />
        </Alert>
        </>
        ) : (
        <>
        <Alert className="task-editor" variant="secondary" onClose={() => {setScheduleTask(false), setHideTable(false)}} dismissible>
        <TaskForm scheduleTask={scheduleTask} setScheduleTask={setScheduleTask} taskId={taskId} setMessage={setMessage} show={show} setShow={setShow} setHideTable={setHideTable} categories={categories} />
        </Alert>
        </>
      )}
        </>
      )}
        </>
      ) : (
        <>
        <Table columns={columns} data={data} setAddTask={setAddTask} setHideTable={setHideTable}/>
        </>
      )}
    </Container>
  </Container>
  </>
  );
};

export default List;
