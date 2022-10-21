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
import ScheduleTaskForm from "../components/Forms/ScheduleTaskForm";
import { SelectColumnFilter } from "../components/Filter";
// import AbortController from "abort-controller"
import "./List.css";

const List = () => {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow = tomorrow.setDate(today.getDate() + 1);
  const [data, setData] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [categories, setCategories] = useState("");
  const [years, setYears] = useState("");
  const [capacity, setCapacity] = useState(40);
  const [taskId, setTaskId] = useState("");
  const [show, setShow] = useState(false);
  const [complete, setComplete] = useState(false);
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
          setYears(res.data.user.years);
          setCapacity(res.data.user.capacity);
          // console.log(res.data.user.years);
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
        disableFilters: true,
        accessor: 'start_time',
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
        disableFilters: true,
        Cell: ( props ) => {
          // eslint-disable-next-line react/prop-types
          if (props.value) {
            // eslint-disable-next-line react/prop-types
            let date = new Date(props.value)
            return date.toLocaleDateString()
          }
          return "-"
         }
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
        Header: 'Complete',
        disableFilters: true,
        accessor: 'est_duration',
        // Cell: props => <FontAwesomeIcon  onClick={() => clickedScheduleTask(props)} icon={icon({name: 'clock', style: 'solid'})} />,
        Cell: ( props ) => {
          // eslint-disable-next-line react/prop-types
          if (!props.value) {
            return "-"
          // eslint-disable-next-line react/prop-types
          } else if (props.value === 999) {
            return <FontAwesomeIcon className="clock" icon={icon({name: 'flag-checkered', style: 'solid'})} />
          }
          return <FontAwesomeIcon className="clock" onClick={() => clickedCompleteTask(props)} icon={icon({name: 'square-check', style: 'solid'})} />
         }
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

const clickedCompleteTask = (cell) => {
  const id = cell?.row?.original._id;
  setTaskId(id);
  setComplete(true);
}

const clickedScheduleTask = (cell) => {
  console.log(cell);
  const id = cell?.row?.original._id;
  console.log("Schedule :" + id);
  setTaskId(id);
  setScheduleTask(true);
  setHideTable(true);
  setConfirm(false);
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
    complete={complete} setComplete={setComplete}
    taskId={taskId} setTaskId={setTaskId}
    setAddTask={setAddTask}
    setEditTask={setEditTask}
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
        <ScheduleTaskForm
        scheduleTask={scheduleTask} setScheduleTask={setScheduleTask}
        years={years}
        capacity={capacity}
        today={today} tomorrow={tomorrow}
        taskId={taskId} 
        setMessage={setMessage}
        setShow={setShow}
        setHideTable={setHideTable} />
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
