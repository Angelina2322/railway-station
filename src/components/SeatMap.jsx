import React, { useContext } from 'react';
import { BookingContext } from '../App';
const SeatMap = ({ capacity, bookedSeats, selectedSeats, onToggle }) => {
    const { selectedSeat, setSelectedSeat } = useContext(BookingContext);
  const seats = Array.from({ length: capacity }, (_, i) => i + 1);

  const handleSeatClick = (num) => {
    // Якщо місце вже обране — знімаємо вибір, якщо ні — обираємо нове
    if (selectedSeat === num) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(num);
    }
  };

  return (
    <div className="seat-selection-container">
      <h3>Оберіть місце у вагоні:</h3>
      <div className="seat-grid">
        {seats.map(num => {
          const isBooked = bookedSeats.includes(num);
          const isSelected = selectedSeat === num;
          
          let statusClass = "available"; 
          if (isBooked) statusClass = "booked"; 
          if (isSelected) statusClass = "selected"; 

          return (
            <button
              key={num}
              disabled={isBooked}
              className={`seat ${statusClass}`}
              onClick={() => handleSeatClick(num)}
            >
              {num}
            </button>
          );
        })}
      </div>
      
      {/* Виведення обраного місця з контексту */}
      {selectedSeat && (
        <div className="selection-info">
          <p>Ваше обране місце: <strong>{selectedSeat}</strong></p>
        </div>
      )}
    </div>
  );
};

export default SeatMap;