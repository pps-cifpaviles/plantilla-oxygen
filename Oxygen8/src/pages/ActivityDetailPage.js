// src/pages/ActivityDetailPage.js
import React, { useContext, useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import { useParams } from 'react-router';
import { TuhuellaContext } from '../context/TuHuellaContext';

const TransportIcons = {
  'coche': '🚗',
  'autobús': '🚌',
  'bicicleta': '🚲',
  'tren': '🚂'
};

const ActivityDetailPage = () => {
  const { fecha } = useParams();
  const { transportData,tiposTransporte  , calculateDailyCO2, updateTripDistance } = useContext(TuhuellaContext);
  const [dailyTrips, setDailyTrips] = useState([]);
  const [totalCO2, setTotalCO2] = useState(0);

  useEffect(() => {
    const dayRecord = transportData?.find(record => record.fecha === fecha);
    if (dayRecord) {
      setDailyTrips(dayRecord.viajes);
      setTotalCO2(calculateDailyCO2(fecha));
    }
  }, [fecha, transportData]);

  const handleDistanceChange = (index, newDistance) => {
    updateTripDistance(index,fecha, newDistance);
    setTotalCO2(calculateDailyCO2(fecha));
  };

  const getColorForEmissions = () => {
    if (totalCO2 < 1.5) return 'success';
    if (totalCO2 <= 3) return 'warning';
    return 'danger';
  };

  return (
    <Container>
      <h1 className="mb-4">Actividad del {fecha}</h1>
      <Card className={`mb-4 border-${getColorForEmissions()}`}>
        <Card.Body>
          <Card.Title>Total CO2: {totalCO2.toFixed(2)} kg</Card.Title>
        </Card.Body>
      </Card>

      <Row>
        {dailyTrips?.map((trip, index) => (
          <Col key={index} md={4} className="mb-3">
            <Card>
              <Card.Body>
              {tiposTransporte?.find(element => console.log(element.name +"=== "+trip.tipo_transporte +"==="+element.name===trip.tipo_transporte ))}
                <Card.Title>
                  {TransportIcons[trip.tipo_transporte]} {trip.tipo_transporte}
                </Card.Title>
                <Card.Text>
                  Factor de Emisión: {tiposTransporte?.find(element => element.name==trip.tipo_transporte).factor} kg CO2/km
                </Card.Text>
                <Form.Label>Distancia: {trip.distancia} km</Form.Label>
                <Form.Range
                  min="0"
                  max="50"
                  value={trip.distancia}
                  onChange={(e) => handleDistanceChange(index, Number(e.target.value))}
                />
                <Card.Footer>
                  CO2 Generado: {(trip.distancia * tiposTransporte?.find(element => element.name==trip.tipo_transporte).factor).toFixed(2)} kg
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ActivityDetailPage;