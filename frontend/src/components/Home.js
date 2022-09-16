import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import work from '../img/work.png';
import './Home.css';
import NewForm from './NewForm';

const Home = () => {
  const [addTask, setAddTask] = useState(false);
  const onButtonClick = () => {
    setAddTask(true);
  };

return (
    <Container className="p-3">
        <h1 className="header">Task Scheduler Home</h1>
        {addTask
          ? 
          <NewForm setAddTask={setAddTask}/>
          :
          <Button onClick={onButtonClick}>Add new task</Button>
          }
        <img src={work} alt="work" />
    </Container>
)
};

export default Home;
