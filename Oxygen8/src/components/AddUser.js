// src/components/AddUser.js
import React, { useState ,useContext} from 'react';
import { UserContext } from '../context/UserContext';
import { Card, Form, Button, Alert } from 'react-bootstrap';



const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { createUser, getMessage } = useContext(UserContext);

  const handlerAddUser = async () => {
   
    createUser({username,password})
    .then(response =>{
      // Extract data from the response
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
          New User
        </Card.Title>
      <Form >
        <Form.Group className="mb-3" controlId="formBasicUsername"> {/* TextField margin="normal" -> Form.Group con mb-3 */}
          <Form.Label>Username</Form.Label> {/* label de TextField -> Form.Label */}
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth // React Bootstrap maneja el ancho completo por defecto
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword"> {/* TextField margin="normal" -> Form.Group con mb-3 */}
          <Form.Label>Password</Form.Label> {/* label de TextField -> Form.Label */}
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth // React Bootstrap maneja el ancho completo por defecto
          />
        </Form.Group>

        <Button variant="primary" onClick={handlerAddUser}> {/* Button variant="contained" color="primary" -> Button variant="primary" */}
          Add User
        </Button>
      </Form>
      </Card.Body>
      {openSnackbar && !error && (
        <Alert variant="success" className="mt-3" onClose={handleCloseSnackbar} dismissible> {/* Snackbar success -> Alert variant="success" */}
          User added successfully
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="mt-3" onClose={() => {setError('');handleCloseSnackbar()}} dismissible> {/* Snackbar error -> Alert variant="danger" */}
          Error: {error}
        </Alert>
      )}
    </Card>
  );
};

export default AddUser;
