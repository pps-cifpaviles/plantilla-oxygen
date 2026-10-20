import React , {useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './context/UserContext';


function App() {
   const { isLogged } = useContext(UserContext);
  
  return (
    
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={isLogged?<HomePage />:<LoginPage/>} />
          <Route path="/actividad/:fecha" element={isLogged?<ActivityDetailPage />:<LoginPage/>} />
        </Routes>
      </Router>
  
  );
}

export default App;