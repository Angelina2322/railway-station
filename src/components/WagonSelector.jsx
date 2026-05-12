import React from 'react';

const WagonSelector = ({ wagons, activeWagonId, onSelectWagon }) => {
  return (
    <div className="wagon-selector-container">
      <h4>Оберіть тип вагона:</h4>
      <div className="wagon-buttons">
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            type="button"
            className={`wagon-btn ${activeWagonId === wagon.id ? 'active' : ''}`}
            onClick={() => onSelectWagon(wagon.id)}
          >
            <span className="wagon-type">{wagon.type}</span>
            <span className="wagon-id">№{wagon.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WagonSelector;