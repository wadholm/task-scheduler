import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import DateTimePicker from 'react-datetime-picker';
import './NewForm.css';
import "react-datepicker/dist/react-datepicker.css";

function NewForm(props) {
    const { setAddTask } = props;

    const [ activeElementType, setActiveElementType ] = useState("dropdown");
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
    }

    const backToDropdown = (event) => {
      setActiveElementType("dropdown");
    }

    const handleSubmit = (event) => {
      console.info(category, startTime, deadline, estDuration);
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
      setAddTask(false);
    }

    // const onFolderNameChange = (e) => {
    //     setFolderName(e.target.value);
    //   };
    
    //   const onFolderCreate = () => {
    //     if (!folderName) {
    //       setMessage({type: "warning", title: "Ojdå, något gick fel.", text: "Kundnamn saknas."})
    //       setShow(true);
    //       return;
    //     }
    //     db.collection("users").doc(docId).collection("folders").doc(folderName).set({
    //       name: folderName,
    //     });
    //     setMessage({type: "success", title: "Allt gick bra!", text: 'Kunden har sparats i databasen.'})
    //     setShow(true);
    //     setFolderName("");
    //   };
    return (
        <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="decription">
        <Form.Label>Description</Form.Label>
        <Form.Control
        required
        type="description"
        placeholder="Enter description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        />
        <Form.Text className="text-muted">
          Describe task.
        </Form.Text>
      </Form.Group>

    {activeElementType === "dropdown"
          ? 
          <>
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" onChange={e => dropDownChanged(e)} aria-label="Default select example">
          <option>Category</option>
          <option value="sales">Sales</option>
          <option value="engineering">Engineering</option>
          <option value="project">Project</option>
          <option value="daily">Daily Job</option>
          <option value="others">Others</option>
          <option value="custom">Type Your own</option>
          </Form.Control>
          </>
          :
          <>
          <Form.Label>Category</Form.Label>
          <InputGroup className="mb-3">
          <Form.Control
          onChange={(event) => setCategory(event.target.value)}
          type="category" 
          placeholder="Category" />
          <Button variant="outline-secondary" id="button-addon2" onClick={backToDropdown}>
          Select
          </Button>
          </InputGroup>
          </>
          }


      <Form.Group className="mb-3" controlId="start-time">
        <Form.Label>Start-time</Form.Label>
        <DateTimePicker onChange={(date) => setStartTime(date)} value={startTime} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="deadline">
        <Form.Label>Deadline</Form.Label>
        <DateTimePicker onChange={(date) => setDeadline(date)} value={deadline} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="est-duration">
        <Form.Label>Estimated duration (in hours)</Form.Label>
        <Form.Control
        onChange={(event) => setEstDuration(event.target.value)}
        type="number"
        min="1" max="100"
        placeholder="Hours"
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Add task
      </Button>
    </Form>
        </>
    )

}

export default NewForm;
