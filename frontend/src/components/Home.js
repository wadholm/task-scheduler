import React from 'react';
import Container from 'react-bootstrap/Container';
import work from '../img/work.png';
import './Home.css';

const Home = () => (
  <Container className="p-3">
      <h1 className="header">Task Scheduler Home</h1>
      <img src={work} alt="work" />
  </Container>
);

export default Home;