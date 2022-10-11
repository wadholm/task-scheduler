/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import BootstrapTable from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import AlertBox from "../components/AlertBox";
import { Alert } from "react-bootstrap";
import CategoryForm from "../components/Forms/CategoryForm";
import "./List.css";
import "./Categories.css";

const Categories = () => {
  const [data, setData] = useState([]);
  const [editCategory, setEditCategory] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryValue, setCategorValue] = useState("");
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
      url: `${process.env.REACT_APP_ENDPOINT}/users/${process.env.REACT_APP_TEST_USER}`,
    })
      .then((res) => {
        setData(res.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
}, []);

  const onButtonClick = () => {
    setCategory("");
    setAddCategory(true);
  };

  const deleteCategory = (value) => {
    setCategory(value);
    setConfirm(true);
    setShow(true);
  
    setMessage({
      type: "danger",
      title: "Delete category!",
      text: "Are you sure you want to delete this category?",
    });
  }

  const clickedEditCategory = (value) => {
    if (editCategory) {
      setEditCategory(false);
      setCategory("");
      setCategorValue("");
    } else {
      setCategory(value);
      setCategorValue(value)
      setEditCategory(true);
    }
  }

  const onButtonClose = () => {
    setEditCategory(false);
    setAddCategory(false);
  }

  return (
    <>
    <style type="text/css">
          {`
    .table {
      margin-top: 1rem;
    },
    .table>thead {
      vertical-align: bottom;
      background-color: none;
      color: dark-grey;
      border: none;
    }
    .table>tbody {
      background: rgb(255 255 255 / 51%);
    }
    .categories {
      max-width: 440px;
  },
      `}
    </style>
    <Container className="p-3 grid wrapper">
    <div className="header-wrapper">
    <h1 className="header">Categories</h1>
    </div>
    <Container className="main-wrapper categories">
    <AlertBox
    message={message} setMessage={setMessage}
    show={show} setShow={setShow}
    confirm={confirm} setConfirm={setConfirm}
    category={category} setCategory={setCategory}
    addCategory={addCategory} setAddCategory={setAddCategory}
    />
  {addCategory ? (
    <Alert className="task-editor" variant="secondary" onClose={onButtonClose} dismissible>
    <CategoryForm 
    editCategory={editCategory} setEditCategory={setEditCategory}
    addCategory={addCategory} setAddCategory={setAddCategory}
    categoryValue={category}
    setMessage={setMessage}
    show={show} setShow={setShow} />
    </Alert>
  ) : (
    <>
    {data.categories ? (
        <>
    <BootstrapTable responsive id="catTable" hover>
      <thead>
        <tr>
          <th>Category</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {
      data.categories.map(category => {
        return (
          <tr key={category}>
          {editCategory && categoryValue == category ? (
                  <td>
        <CategoryForm 
        editCategory={editCategory} setEditCategory={setEditCategory}
        addCategory={addCategory} setAddCategory={setAddCategory}
        categoryValue={category}
        setMessage={setMessage}
        show={show} setShow={setShow} />
        </td>
      ) : (
        <td>
        {category}
        </td>)}
          <td onClick={() => clickedEditCategory(category)}>
            <FontAwesomeIcon icon={icon({name: 'pen-to-square', style: 'solid'})} />
          </td>
          <td onClick={() => deleteCategory(category)}>
            <FontAwesomeIcon icon={icon({name: 'trash', style: 'solid'})} />
          </td>
          </tr>
        )
      })}
      </tbody>
    </BootstrapTable>
    <div><Button variant="secondary" onClick={onButtonClick}>Add new category</Button></div>
        </>
      ) : (
        <>
        <p>No tasks to present. </p>
        </>
      )}
    </>
  )}
    </Container>
    </Container>
    </>
  );
};

export default Categories;
