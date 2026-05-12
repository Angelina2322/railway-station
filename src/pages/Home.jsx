import { useState, useEffect } from 'react';
// Прибираємо імпорт статичних даних, бо тепер беремо їх з сервера
import TrainCard from '../components/TrainCard';

const Home = () => {
  // 1. Створюємо стан для списку потягів (спочатку пустий масив)
  const [trains, setTrains] = useState([]);
  const [query, setQuery] = useState('');

  // 2. Завантаження даних з сервера
  useEffect(() => {
    fetch('http://localhost:5000/api/trains')
      .then(res => {
        if (!res.ok) throw new Error("Помилка сервера");
        return res.json();
      })
      .then(data => {
        console.log("Дані отримано:", data);
        setTrains(data); // Зберігаємо отримані дані в стан
      })
      .catch(err => console.error("Помилка:", err));
  }, []);

  // 3. Фільтрація має базуватися на стані 'trains', а не на імпортованому файлі
  const filtered = trains.filter(t => 
    t.route.to.toLowerCase().includes(query.toLowerCase()) || 
    t.number.includes(query)
  ); 

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ color: '#003572', fontSize: '2.5rem' }}>Укрзалізниця</h1>
        <p>Швидке бронювання квитків онлайн</p>
      </header>

      <input 
        type="text" 
        className="search-input"
        placeholder="Введіть місто прибуття або номер рейсу..." 
        onChange={e => setQuery(e.target.value)} 
      />

      <div className="train-grid">
        {filtered.length > 0 ? (
          filtered.map(t => <TrainCard key={t.id} train={t} />)
        ) : (
          <p style={{ textAlign: 'center' }}>Потягів не знайдено або сервер вимкнено...</p>
        )}
      </div>
    </div>
  );
};

export default Home;