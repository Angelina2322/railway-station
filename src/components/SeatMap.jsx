const SeatMap = ({ capacity, bookedSeats, selectedSeats, onToggle }) => {
  const seats = Array.from({ length: capacity }, (_, i) => i + 1);

  return (
    <div className="seat-grid">
      {seats.map(num => {
        const isBooked = bookedSeats.includes(num);
        const isSelected = selectedSeats.includes(num);
        
        let statusClass = "available"; 
        if (isBooked) statusClass = "booked"; 
        if (isSelected) statusClass = "selected"; 

        return (
          <button
            key={num}
            disabled={isBooked}
            className={`seat ${statusClass}`}
            onClick={() => onToggle(num)}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
};

export default SeatMap;