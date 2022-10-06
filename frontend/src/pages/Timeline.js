/* eslint-disable no-undef */
import React from "react";
import Container from "react-bootstrap/Container";
import timeline from "../img/timeline.png";
import "./Timeline.css";

const Timeline = () => {

  return (
    <>
    <Container className="p-3 grid wrapper">
    <div className="header-wrapper">
    <h1 className="header">Timeline</h1>
    <p>Functionality is under construction. </p>
    </div>
    <img className="timeline-img"src={timeline} alt="timeline" />
    </Container>
    </>
  );
};

export default Timeline;
