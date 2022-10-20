/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Scheduler, {SchedulerData, ViewTypes, DemoData} from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import moment from 'moment';

// import withDragDropContext from '../helper/withDnDContext'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';



class MyScheduler extends Component {

    componentDidMount() {
        if (document.getElementsByClassName("header3-text").length > 0) {
        let resHeader = document.getElementsByClassName("header3-text")
        resHeader[0].innerText = "Tasks";
        }
      }

      componentDidUpdate() {
        if (document.getElementsByClassName("header3-text").length > 0) {
          let resHeader = document.getElementsByClassName("header3-text")
          resHeader[0].innerText = "Tasks";
          }
      }

    constructor(props) {
        super(props);
    
        let newConfig = {
          //dayStartFrom: 9
        };

        let schedulerData = new SchedulerData(
          new Date(), 
          ViewTypes.Week,
          /*showAgenda*/ false,
          /*isEventPerspective*/ false,
          newConfig
        );
        schedulerData.localeMoment.locale('fr');

        schedulerData.setResources(this.props.resources);

        schedulerData.setEvents(this.props.events);
    
        this.state = {
          resources: this.props.resources,
          events: this.props.events,
          viewModel: schedulerData,
          task: this.props.task,
          setTask: this.props.setTask,
          elapsed_time: "",
          est_duration: "",
          show: false,
        }
      }
    

      handleClose = () => {
        this.setState({
        show: false
      })
    };
      handleShow = () => {
        this.setState({
        show: true
      })};
    
      prevClick = (schedulerData) => {
        console.log("prevClick")
        schedulerData.prev();
        schedulerData.setEvents(this.state.events);
        this.setState({
          viewModel: schedulerData
        })
      }
    
      nextClick = (schedulerData) => {
        console.log("nextClick")
        schedulerData.next();
        schedulerData.setEvents(this.state.events);
        this.setState({
          viewModel: schedulerData
        })
      }
    
      onSelectDate = (schedulerData, date) => {
        console.log("onSelectDate")
        schedulerData.setDate(date);
        schedulerData.setEvents(this.state.events);
        this.setState({
          viewModel: schedulerData
        })
      }
    
      onViewChange = (schedulerData, view) => {
        console.log("onViewChange")

        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setResources(this.state.resources);
        schedulerData.setEvents(this.state.events);
        this.setState({
          viewModel: schedulerData
        })
      }

      eventClicked = (schedulerData, event) => {
        // show modal with elapsed time. 
          // console.log(this.props.task);
          // let task = this.state.task;
          // Calculating the time elapsed from 
          // start_time to current time
    
          // set the start time
          let first = new Date(event.start);
          let duration = event.viewEventText;
            
          // assigning present time to now variable
          let end = new Date();

          let elapsed = (end-first);
            
          // We'll get the elapsed time in hours
          // console.log(elapsed/(1000*60*60));

          // set hours and round to nearest integer
          elapsed = Math.round(elapsed/(1000*60*60));

          // set all details and show modal
          if (elapsed/(1000*60*60) < 0) {
            console.log("Event has not started yet.")
          }

          // this.props.setTask(task);
          // this.props.setShow(true);
          this.setState({
            elapsed_time: elapsed,
            est_duration: duration,
            show: true
          })
      };

    render(){
        const {viewModel} = this.state;
        const {show} = this.state;
        const {elapsed_time} = this.state;
        const {est_duration} = this.state;

        if (show) {
          return (
            <>
            <Modal
                  // {...props}
                  size="sm"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
            show={show} onHide={this.handleClose}
            >
            <Modal.Header closeButton>
              <Modal.Title>Task details</Modal.Title>
            </Modal.Header>
              <Modal.Body>
              <div>Elapsed time: {elapsed_time} hours</div>
              <div>Estimated duration: {est_duration}</div>
              </Modal.Body>
              <Modal.Footer>
              <Button variant="primary" onClick={this.handleClose}>
            Ok!
            </Button>
              </Modal.Footer>
            </Modal>
            <div>
            <Scheduler 
              schedulerData={viewModel}
              prevClick={this.prevClick}
              nextClick={this.nextClick}
              onSelectDate={this.onSelectDate}
              onViewChange={this.onViewChange}
              eventItemClick={this.eventClicked}
            //   viewEvent2Text="Ops 2"
            //   viewEvent2Click={this.ops2}
              //updateEventStart={this.updateEventStart}
              //updateEventEnd={this.updateEventEnd}
              //moveEvent={this.moveEvent}
              //newEvent={this.newEvent}
            />
            </div>
              </>
          );
        } else {
          return (
            <div>
            <Scheduler
              schedulerData={viewModel}
              prevClick={this.prevClick}
              nextClick={this.nextClick}
              onSelectDate={this.onSelectDate}
              onViewChange={this.onViewChange}
              eventItemClick={this.eventClicked}
              schedulerMaxHeight={400}

            //   viewEvent2Text="Ops 2"
            //   viewEvent2Click={this.ops2}
              //updateEventStart={this.updateEventStart}
              //updateEventEnd={this.updateEventEnd}
              //moveEvent={this.moveEvent}
              //newEvent={this.newEvent}
            />
            </div>
        )
        }
    }
}

export default DragDropContext(HTML5Backend)(MyScheduler);
// export default withDragDropContext(MyScheduler);