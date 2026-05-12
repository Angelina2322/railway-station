import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import './App.css';

export const BookingContext = createContext();

function App() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  return (
   <BookingContext.Provider value={{ selectedSeat, setSelectedSeat }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} /> 
            {/* Параметр :trainId дозволяє відкривати сторінку для конкретного потяга */}
            <Route path="/booking/:trainId" element={<Booking />} /> 
          </Routes>
        </Router>
      </div>
    </BookingContext.Provider>
  );
}

export default App;