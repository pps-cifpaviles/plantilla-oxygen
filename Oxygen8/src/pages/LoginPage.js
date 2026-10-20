import React, { useState } from 'react';
import AddUser from '../components/AddUser';
import Login from '../components/Login';
import { Container , Row, Col} from 'react-bootstrap';
import { Link } from 'react-router';
import Logo from '../components/Logo'

function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);
 
  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Container  fluid="md" className="mt-2"> {/* marginTop: 2 -> mt-2 */}
    <Row>
    <Col md={{ span: 4, offset: 4 }}>
      <h2 className="text-center"> {/* Typography h1 variant="h5" align="center" -> h1 con clases */}
      Welcome to the Oxygen8 app. Balance your CO₂, breathe better.!
    
    </h2>
    </Col>
    </Row>
    <Row>
    <Col  md={{ offset: 1, span:5 }} ><Logo></Logo></Col>
    <Col  md={{ offset: 1, span:3 }}  >
    {showLogin ? <Login /> : <AddUser />}
    <div className="text-center mt-2">
      {showLogin ? (
        <Link to="#" onClick={handleToggleView} className="btn btn-link p-0"> {/* Link component="button" variant="body2" -> Link con onClick y clases */}
          Don't have an account? Register here.
        </Link>
      ) : (
        <Link to="#" onClick={handleToggleView} className="btn btn-link p-0"> {/* Link component="button" variant="body2" -> Link con onClick y clases */}
          Already have an account? Login here.
        </Link>
      )}
    </div>
    </Col>
     
    </Row>
    
  </Container>
  );
}

export default LoginPage;
