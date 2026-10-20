import React, { useContext,useState,useEffect } from 'react';
import { Container, Carousel,Button } from 'react-bootstrap';
import { TuhuellaContext } from '../context/TuHuellaContext';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router';
import AddActivity from '../components/AddActivity';
const domain = window.location.origin;
const imagesUrl = new URL("/", domain);


const HomePage = () => {
  
  const { tips, transportData, calculateDailyCO2, loadUserActivity } = useContext(TuhuellaContext);
  const [ showActivityForm, setShowActivityForm] = useState(false);
  const { user } = useContext(UserContext);
  

  const getColorForEmissions = (co2Amount) => {
    if (co2Amount < 1.5) return 'success';
    if (co2Amount <= 3) return 'warning';
    return 'danger';
  };

  useEffect(()=>{
    loadUserActivity(user._id);
  },[])

  return (

    <Container>
      
      <Carousel className="mb-4">
        {tips.map((tip, index) => (
          <Carousel.Item key={index}>
                <img
                    className="d-block h-40"
                    src={`${imagesUrl}sostenibilidad${index+1}.jpg`}
                    alt={`slide ${index}`}
                  />
                <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>
                  <h3>Consejo {index+1} :</h3>
                  <p>{tip}</p>
                </Carousel.Caption>

           
          </Carousel.Item>
        ))}
      </Carousel>

      <h2>Registro de Actividades</h2>
     
      <AddActivity show={showActivityForm}></AddActivity>
      <div className="list-group">
        {transportData?.map((record, index) => {
          const co2Total = calculateDailyCO2(record.fecha);
          const variantClass = getColorForEmissions(co2Total);
          
          return (
            <Link 
              key={index} 
              to={`/actividad/${record.fecha}`}
              className={`list-group-item list-group-item-action list-group-item-${variantClass}`}
            >
              {record.fecha} - CO2: 
              <span className={`badge bg-${variantClass} ms-2`}>
                {co2Total.toFixed(2)} kg
              </span>
            </Link>
          );
        })}
      </div>
    </Container>
  );
};

export default HomePage;