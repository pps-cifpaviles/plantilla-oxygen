import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const TuhuellaContext = createContext();
const ThemeContext = createContext();
const domain = window.location.origin;
const consejosUrl = new URL("/consejos.json", domain);

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT ;

export const TuhuellaProvider = ({ children }) => {
  const [transportData, setTransportData] = useState([]);
 
  const [tips, setTips] = useState([]);
  const [isLogged, setLogged] = useState(false);
  const [user, setUser] =useState();
  const [tiposTransporte,setTiposTransporte] = useState();
 
   const loadUserActivity = async (userId) => {
       
         const response = await axios.get(`${apiEndpoint}/activities/getAll/${userId}`, { });
         let aux_data=[];
         for (let i in response.data)
         {
          let date = response.data[i].fecha;
          let current_date = aux_data.find(element => element.fecha==date);
           if(!current_date)
           {
              aux_data.push({ "fecha":date , "viajes":[] });
              current_date = aux_data.find(element => element.fecha==date);
           }
           current_date.viajes.push(response.data[i]);
         }
         setTransportData( aux_data);
        
     };



  const loadTips = async () => {
       
      const response = await fetch(consejosUrl);
      const json = await response.json();
      setTips(json.consejos);
    
  };

  const loadTiposTransporte = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/transportTypes/getAll`);
        setTiposTransporte(response.data.data);
        
      } catch (error) {
        console.log(error); // Simplified error handling
      }
    };
  const addActivity= async (activities,userId) => {
    
    try {
      const fecha = activities.fecha;
      const nueva_actividad={"fecha":fecha,"viajes":[]};
      for (const viaje of activities.viajes) { // Usa for...of en lugar de forEach
        let aux_viaje= viaje;
        aux_viaje["fecha"] = fecha;
        const response = await axios.post(`${apiEndpoint}/activities/addActivity/${userId}`, aux_viaje);
         // Usa setTransportData para actualizar el estado
         nueva_actividad.viajes.push(viaje);
      }
      setTransportData(prevData => [...prevData, nueva_actividad]);
    } catch (error) {
      console.error('Error al añadir actividad:', error);
    }
    };

     
     
  useEffect(() => {
    if(isLogged)
         {
          loadUserActivity().catch(error => console.error('Error loading data:', error));
           
         }
    loadTips(); 
    loadTiposTransporte();    
    },
   [isLogged,setLogged]);

  const calculateDailyCO2 = (date) => {
    const dayActivity = transportData.find(record => record.fecha === date );
    if (!dayActivity) return 0;
    return dayActivity.viajes.reduce((total, trip) => {
        const emissionFactor = tiposTransporte.find(tt => tt.name==trip.tipo_transporte).factor;
        return total + (trip.distancia * emissionFactor);
      }, 
      0);
  };

  const updateTripDistance = (index,fecha, newDistance) => {
    setTransportData(prevData => 
      prevData.map((record,i) => {
        if (fecha=== record.fecha) {
          return {
            ...record,
            viajes: record.viajes.map((trip,j )=> 
              j == index
                ? { ...trip, distancia: newDistance }
                : trip
            )
          };
        }
        return record;
      })
    );
  };

  return (
    <TuhuellaContext.Provider value={{
      transportData,
      tips,
      loadUserActivity,
      calculateDailyCO2,
      updateTripDistance, 
      setLogged,
      user,setUser,
      tiposTransporte,addActivity
    }}>
      {children}
    </TuhuellaContext.Provider>
  );
};