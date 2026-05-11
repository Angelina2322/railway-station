import React, { useState } from 'react';
import { trains } from '../data/trains';
import TrainCard from './TrainCard';

const TrainList = () => {
  // Стан для пошукового запиту (Лаб 9)
  const [searchTerm, setSearchTerm] = useState('');

  // Логіка фільтрації за маршрутом або номером потяга 
  const filteredTrains = trains.filter((train) => {
    const search = searchTerm.toLowerCase();
    return (
      train.number.toLowerCase().includes(search) ||
      train.route.from.toLowerCase().includes(search) ||
      train.route.to.toLowerCase().includes(search)
    );
  });

  return (
    <div className="train-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Пошук за номером потяга або містом..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="train-grid">
        {filteredTrains.length > 0 ? (
          filteredTrains.map((train) => (
            <TrainCard key={train.id} train={train} />
          ))
        ) : (
          <p className="no-results">Потягів за вашим запитом не знайдено.</p>
        )}
      </div>
    </div>
  );
};

export default TrainList;