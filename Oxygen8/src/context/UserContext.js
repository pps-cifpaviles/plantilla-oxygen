import React, { useState, createContext,useRef } from 'react';
import axios from 'axios';
import {errorMessage} from '../utils'

// 1. Create the Context
export const UserContext = createContext();

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

// 2. Create the Provider
export const UserProvider = ({ children }) => {
  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState({});
  const message = useRef(null);

  const login = async ({ username, password }) => {
    try {
      const response = await axios.post(`${apiEndpoint}/auth/login`, { username, password });
      setUser(response.data.user);
      sessionStorage.setItem('authToken', response.data.token);
      setLogged(true);
    } catch (error) {
      message.current=errorMessage(error); // Simplified error handling
    }
  };

  const logout = async () => {
    if (user) {
      try {
        await axios.post(`${apiEndpoint}/auth/logout`, { username: user.username });
        sessionStorage.removeItem('authToken');
      } catch (error) {
        message.current=errorMessage(error);
      }
    }
    setUser({});
    setLogged(false);
  };

  const createUser = async ({ username, password }) => {
    try {
      await axios.post(`${apiEndpoint}/users/addUser`, { username, password });
    } catch (error) {
    
      message.current=errorMessage(error);;
    }
  };

  const getMessage = () => {
    const temp = message.current;
    message.current="";
    return temp;
  };

  return (
    <UserContext.Provider value={{
      login,
      createUser,
      logout,
      user,
      isLogged,
      getMessage,
    }}>
      {children}
    </UserContext.Provider>
  );
};
