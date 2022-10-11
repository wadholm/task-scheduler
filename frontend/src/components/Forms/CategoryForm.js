/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import BootstrapForm from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Form.css";

function CategoryForm(props) {
  const { setShow, setMessage, editCategory, setEditCategory, categoryValue, addCategory, setAddCategory} = props;
  const [validated, setValidated] = useState(false);
  const [category, setCategory] = useState("");

    useEffect(() => {
      setCategory(categoryValue)
  }, [categoryValue]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      Axios({
        method: "POST",
        url: `${process.env.REACT_APP_ENDPOINT}/categories/${process.env.REACT_APP_TEST_USER}`,
        data: {
          "category": category
        }
      })
        .then((res) => {
          console.log(res);
          if (res.data.addedCount === 1) {
            console.log(res.data.addedCount);
            setMessage({
              type: "success",
              title: "Success!",
              text: res.data.message,
            });
            setAddCategory(false);
            setShow(true);
            setValidated(false);
          } else if (res.data.addedCount === 0) {
            console.log(res.data.addedCount);
            setMessage({
              type: "warning",
              title: "Ops!",
              text: res.data.message,
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
          setShow(true);
        });
    }
    setValidated(true);
  };

  const handleUpdate = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || category == "") {
      event.preventDefault();
      event.stopPropagation();
  } else if (categoryValue === category) {
    // no changes
    setEditCategory(false);
    setCategory("");
    setValidated(false);
  } else {
    Axios({
      method: "PUT",
      url: `${process.env.REACT_APP_ENDPOINT}/categories/${process.env.REACT_APP_TEST_USER}`,
      data: {
        "prev_value": categoryValue,
        "new_value": category
      }
    })
      .then((res) => {
        setEditCategory(false);
        setCategory("");
        if (res.status === 200) {
          setMessage({
            type: "success",
            title: "Success!",
            text: res.data.message,
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
        setShow(true);
      });
  }
  setValidated(true);
  };

if (addCategory) {
  return (
    <>
    <div className="editable">
      <BootstrapForm noValidate validated={validated} onSubmit={handleSubmit} >
        <BootstrapForm.Group className="mb-3" controlId="decription">
          <BootstrapForm.Label>Category</BootstrapForm.Label>
            <InputGroup className="mb-3">
              <BootstrapForm.Control
                required
                className="editable"
                onChange={(event) => setCategory(event.target.value)}
                type="category"
                value={category}
              />
            <BootstrapForm.Control.Feedback type="invalid">
            Category can not be empty.
          </BootstrapForm.Control.Feedback>
            </InputGroup>
        </BootstrapForm.Group>
        <Button variant="primary" type="submit">
          Add category
        </Button>
        <Button variant="outline-primary" type="reset" onClick={() => setAddCategory(false)}>
          Cancel
        </Button>
      </BootstrapForm>
      </div>
    </>
  )
} else if (editCategory) {
    return (
      <>
      <style type="text/css">
          {`
    input-group:not(.has-validation)>.dropdown-toggle:nth-last-child(n+3), .input-group:not(.has-validation)>.form-floating:not(:last-child)>.form-control, .input-group:not(.has-validation)>.form-floating:not(:last-child)>.form-select, .input-group:not(.has-validation)>:not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating) {
      border-top-right-radius: 0.375rem;
      border-bottom-right-radius: 0.385rem;
    }
    `}
</style>
      <div className="edit-div">
        <BootstrapForm noValidate validated={validated} >
          <BootstrapForm.Group controlId="decription">
              <InputGroup>
                <BootstrapForm.Control
                  required
                  className="editable"
                  onChange={(event) => setCategory(event.target.value)}
                  type="category"
                  value={category}
                />
                <Button
                  variant="secondary"
                  id="button-addon2"
                  className="edit-button"
                  onClick={handleUpdate}
                >
                  Save
                </Button>
              <BootstrapForm.Control.Feedback type="invalid">
              Category can not be empty.
            </BootstrapForm.Control.Feedback>
              </InputGroup>
          </BootstrapForm.Group>
          {/* <Button variant="primary" type="submit">
            Update category
          </Button>
          <Button variant="outline-primary" type="reset" onClick={() => setEditCategory(false)}>
            Cancel
          </Button> */}
        </BootstrapForm>
        </div>
      </>
    )
  }
  return (
    <>
    <div className="editable">
    <p>Something went wrong. </p>
    </div>
    </>
  );
}

export default CategoryForm;
