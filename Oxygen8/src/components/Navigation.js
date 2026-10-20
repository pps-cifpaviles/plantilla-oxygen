import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Container,Button } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router';
import { TuhuellaContext } from '../context/TuHuellaContext';
import { UserContext } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Si usas Font Awesome
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono


const Navigation = () => {
  const { transportData } = useContext(TuhuellaContext);
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handlerLogout =()=>
  {
    logout();
    navigate("/");
  }
  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">TuHuella</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Actividades" id="basic-nav-dropdown">
              {transportData?.map((record, index) => (
                <NavDropdown.Item 
                  key={index} 
                  as={Link} 
                  to={`/actividad/${record.fecha}`}
                >
                  {record.fecha}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            </Nav>
            <Nav>
            <Button variant="outline-light" onClick={e=>handlerLogout()}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> 
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;