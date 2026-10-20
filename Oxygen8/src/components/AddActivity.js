import React, { useState ,useContext} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { TuhuellaContext } from '../context/TuHuellaContext';
import { UserContext } from '../context/UserContext';

function AddActivity({ show }) {
  const { tiposTransporte, addActivity  } = useContext(TuhuellaContext);  
  const [showModal, setShowModal] = useState(show);
  const [fecha, setFecha] = useState('');
  const { user } = useContext(UserContext);
  const [viajes, setViajes] = useState([{ tipo_transporte: '', distancia: '', unidad: 'km' }]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleAddViaje = () => {
    setViajes([...viajes, { tipo_transporte: '', distancia: '', unidad: 'km' }]);
  };

  const handleViajeChange = (index, field, value) => {
    const updatedViajes = [...viajes];
    updatedViajes[index][field] = value;
    setViajes(updatedViajes);
  };

  const handleRemoveViaje = (index) => {
    const updatedViajes = [...viajes];
    updatedViajes.splice(index, 1);
    setViajes(updatedViajes);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newActivity = {
      fecha,
      viajes,
    };
    addActivity(newActivity,user._id);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Nuevo
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </Form.Group>

            {viajes?.map((viaje, index) => (
              <div key={index}>
                <Form.Group controlId={`formTipoTransporte-${index}`}>
                  <Form.Label>Tipo de Transporte</Form.Label>
                  <Form.Control
                    as="select"
                    value={viaje.tipo_transporte}
                    onChange={(e) => handleViajeChange(index, 'tipo_transporte', e.target.value)}
                  >
                    <option value="">Selecciona...</option>
                    {tiposTransporte.map((tipo) => (
                      <option key={tipo.name} value={tipo.name}>
                        {tipo.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId={`formDistancia-${index}`}>
                  <Form.Label>Distancia</Form.Label>
                  <Form.Control
                    type="number"
                    value={viaje.distancia}
                    onChange={(e) => handleViajeChange(index, 'distancia', e.target.value)}
                  />
                </Form.Group>

                <Button variant="outline-success" onClick={() => handleRemoveViaje(index)}>
                  Eliminar Viaje
                </Button>
              </div>
            ))}

            <Button variant="success" onClick={handleAddViaje}>
              Añadir Viaje
            </Button>

            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddActivity;