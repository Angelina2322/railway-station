import { useNavigate } from 'react-router-dom';

const TrainCard = ({ train }) => {
  const navigate = useNavigate();

  return (
    <div className="train-card">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>№ {train.number}</h3>
        <span style={{ color: '#28a745', fontWeight: 'bold' }}>{train.price} ₴</span>
      </div>
      <div className="route-info">
        {train.route.from} ➔ {train.route.to}
      </div>
      <div className="details">
        <p>🕒 Відправлення: {new Date(train.departure).toLocaleString('uk-UA')}</p>
        <p>⏳ В дорозі: {train.duration}</p>
        <p>💺 Вільних місць: {train.capacity}</p>
      </div>
      <button className="book-btn" onClick={() => navigate(`/booking/${train.id}`)}>
        Вибрати квиток
      </button>
    </div>
  );
};

export default TrainCard;