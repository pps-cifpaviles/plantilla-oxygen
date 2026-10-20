// src/components/Login.js
import React, { useState ,useContext} from 'react';
import { Card,  Form, Button, Alert, CardBody } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { login,
    user,
    isLogged,
    getMessage } = useContext(UserContext);
  const navigate = useNavigate();
  

  
  const loginUser = async () => {
   
    login({username,password})
    .then(response =>{
      // Extract data from the response
      navigate("/");
      setOpenSnackbar(true);
      setError(getMessage());})
    .catch(error =>setError(error))
      
    };


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card border="success" style={{ width: '20rem' }}> {/* marginTop se traduce a la clase 'mt-4' */}
      <Card.Body>
          <Card.Title> 
            Login
          </Card.Title>
       
        <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername"> {/* TextField margin="normal" -> Form.Group con mb-3 */}
              <Form.Label>Username</Form.Label> {/* label de TextField -> Form.Label */}
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth // React Bootstrap maneja el ancho completo por defecto en Form.Control dentro de Row/Col o Container
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword"> {/* TextField margin="normal" -> Form.Group con mb-3 */}
              <Form.Label>Password</Form.Label> {/* label de TextField -> Form.Label */}
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth // React Bootstrap maneja el ancho completo por defecto
              />
            </Form.Group>

            <Button variant="primary" onClick={loginUser}> {/* Button variant="contained" color="primary" -> Button variant="primary" */}
              Login
            </Button>
          </Form>
          </Card.Body>
          {openSnackbar && !error&&(
            <Alert variant="success" className="mt-3" onClose={handleCloseSnackbar} dismissible> {/* Snackbar success -> Alert variant="success" */}
              Login successful
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mt-3" onClose={() => {setError('');handleCloseSnackbar();}} dismissible> {/* Snackbar error -> Alert variant="danger" */}
              Error: {error}
            </Alert>
          )}
    </Card>
  );
};

export default Login;
