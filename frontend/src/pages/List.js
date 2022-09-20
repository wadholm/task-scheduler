/* eslint-disable no-undef */
import React, { useEffect, useState, useMemo } from "react";
import Axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "../components/TableContainer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import AlertBox from "../components/AlertBox";
import ConfirmBox from "../components/ConfirmBox";

const List = () => {
  const [data, setData] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    title: "",
    text: "",
  });

  useEffect(() => {
      Axios({
        method: "GET",
        url: `${process.env.REACT_APP_DEV_ENDPOINT}/tasks/user/${process.env.REACT_APP_TEST_USER}`,
      })
        .then((res) => {
          setData(res.data.tasks);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [data]);


  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: '_id', // accessor is the "key" in the data,
      },
      {
        Header: 'Description',
        accessor: 'description', // accessor is the "key" in the data
      },
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Edit',
        accessor: 'edit', // accessor is the "key" in the data,
        Cell: props => <FontAwesomeIcon  onClick={() => editTask(props)} icon={icon({name: 'pen-to-square', style: 'solid'})} />
      },
      {
        Header: 'Delete',
        accessor: 'delete', // accessor is the "key" in the data,
        Cell: props => <FontAwesomeIcon  onClick={() => deleteTask(props)} icon={icon({name: 'trash', style: 'solid'})} />
      },
    ],
    []
  )


  const editTask = (cell) => {
    console.log(cell?.row?.original._id);
}

const deleteTask = (cell) => {
  console.log(cell?.row?.original._id);
  const id = cell?.row?.original._id;
  setTaskId(id);
  console.log(taskId);

  setConfirm(true);
  setMessage({
    type: "danger",
    title: "Delete task!",
    text: "Are you sure you want to delete this task?",
  });
}

  return (
  <Container className="p-3">
    <h1 className="header">Task Scheduler List</h1>
    <AlertBox message={message} show={show} setShow={setShow} />
    <ConfirmBox 
    message={message} setMessage={setMessage}
    setShow={setShow}
    confirm={confirm} setConfirm={setConfirm}
    taskId={taskId} setTaskId={setTaskId}
    />
    <Table columns={columns} data={data} />
  </Container>
  );
};

export default List;
