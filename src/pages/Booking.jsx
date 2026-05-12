import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Booking = () => {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Стан для обраного вагона
  const [activeWagon, setActiveWagon] = useState(null);
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/trains/${trainId}`)
      .then(res => {
        if (!res.ok) throw new Error('Потяг не знайдено');
        return res.json();
      })
      .then(data => {
        setTrain(data);
        if (data.wagons && data.wagons.length > 0) {
          setActiveWagon(data.wagons[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Помилка завантаження:", err);
        setLoading(false);
      });

    fetch(`http://localhost:5000/api/bookings/${trainId}`)
      .then(res => res.json())
      .then(data => setBookedSeats(data))
      .catch(err => console.error("Помилка завантаження бронювань:", err));
  }, [trainId]);

  const toggleSeat = (seatNum) => {
    const seatId = `${activeWagon.id}-${seatNum}`;
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) return alert("Оберіть хоча б одне місце!");

    fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trainId: parseInt(trainId),
        seats: selectedSeats,
        ...formData
      })
    })
    .then(res => res.json())
    .then(() => {
      alert("Квитки успішно заброньовано!");
      setBookedSeats([...bookedSeats, ...selectedSeats]);
      setSelectedSeats([]);
    })
    .catch(err => alert("Помилка при бронюванні"));
  };

  if (loading) return <div className="container">Завантаження...</div>;
  if (!train) return <div className="container">Потяг не знайдено</div>;

  return (
    <div className="container">
      <h2>Бронювання квитків: Потяг №{train.number}</h2>
      <p className="route-title">{train.route.from} — {train.route.to}</p>

      {/* Вибір вагона */}
      <div className="wagon-selection-section">
        <h4>Оберіть вагон:</h4>
        <div className="wagon-list">
          {train.wagons && train.wagons.map((wagon) => (
            <button
              key={wagon.id}
              className={`wagon-btn ${activeWagon?.id === wagon.id ? 'active' : ''}`}
              onClick={() => {
                setActiveWagon(wagon);
                setSelectedSeats([]); // Скидаємо вибір при зміні вагона
              }}
            >
              Вагон {wagon.id} <br />
              <small style={{ opacity: 0.7 }}>{wagon.type}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="booking-layout">
        <div className="seat-map-section">
          <h4>Схема вагона №{activeWagon?.id} ({activeWagon?.type})</h4>
          
          {/* Легенда */}
          <div className="legend" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#28a745', borderRadius: '4px' }}></div>
              <span>Вільне</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#007bff', borderRadius: '4px' }}></div>
              <span>Обране</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#dc3545', borderRadius: '4px' }}></div>
              <span>Зайняте</span>
            </div>
          </div>

          {/* ДИНАМІЧНА СІТКА ВАГОНА */}
          <div className={`seat-grid ${
            activeWagon?.type === 'Люкс' ? 'luks' : 
            activeWagon?.type === 'Плацкарт' ? 'platskart' : 'kupe'
          }`}>
            {activeWagon && Array.from({ length: activeWagon.capacity }).map((_, i) => {
              const seatNum = i + 1;
              const seatId = `${activeWagon.id}-${seatNum}`;
              const isBooked = bookedSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);

              return (
                <React.Fragment key={seatId}>
                  <button
                    disabled={isBooked}
                    className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                    onClick={() => toggleSeat(seatNum)}
                  >
                    {seatNum}
                  </button>
                  {/* Логіка проходу для Купе: після кожного 2-го місця в ряду з 4-х */}
                  {activeWagon.type === 'Купе' && seatNum % 2 === 0 && seatNum % 4 !== 0 && <div className="aisle" />}
                  {/* Логіка для Люксу: прохід після кожного 1-го місця в ряду з 2-х */}
                  {activeWagon.type === 'Люкс' && seatNum % 1 === 0 && seatNum % 2 !== 0 && <div className="aisle" />}
                  {/* Для плацкарту можна додати свою логіку або залишити стандарт */}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Форма персональних даних */}
        <div className="booking-form-section">
          <h4>Персональні дані</h4>
          <form onSubmit={handleSubmit} className="booking-form">
            <input 
              name="name" 
              placeholder="Ім'я та Прізвище" 
              required 
              value={formData.name}
              onChange={handleInputChange} 
            />
            <input 
              name="phone" 
              placeholder="Телефон" 
              required 
              value={formData.phone}
              onChange={handleInputChange} 
            />
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              required 
              value={formData.email}
              onChange={handleInputChange} 
            />
            
            <div className="summary-card">
              <p>Обрано місць: <strong>{selectedSeats.length}</strong></p>
              <p>Сума: <strong>{selectedSeats.length * (train.price || 0)} ₴</strong></p>
              <button type="submit" className="book-btn">Підтвердити бронювання</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;