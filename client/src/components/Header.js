import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

// CSS
import "./styles/header.css";

const Header = () => {
  
  const handleRefresh = ()=>{
    window.location.reload(true);
  }

  return (
    // <Navbar bg="light" expand="lg" className="mb-4">
    <Navbar className="pos">
      <Container>
        <Navbar.Brand className="fsize" onClick={handleRefresh}>
          <img src="/error.png" alt="" className="img" />
          NC-Monitor
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item>Action</NavDropdown.Item>
              <NavDropdown.Item>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default Header;
