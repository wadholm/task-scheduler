import { useRoutes } from "hookrouter";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../img/logo.jpg";
import "./Navigation.css";

import Routes from "../Router";

const Navigation = () => {
  const routeResult = useRoutes(Routes);

  return (
    <div className="Navigation">
      <Navbar className="mw-nav" expand="lg">
        <Container>
        <img className="logo" src={logo} alt="logo" />
          <Navbar.Brand href="/">
            <h3>Task Scheduler</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/list">List</Nav.Link>
              <Nav.Link href="/timeline">Timeline</Nav.Link>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="/categories">Categories</NavDropdown.Item>
              <NavDropdown.Item href="/user">User details</NavDropdown.Item>
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {routeResult}
    </div>
  );
};

export default Navigation;
