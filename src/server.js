import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const trains = [
  { 
    id: 1, 
    number: "705К", 
    route: { from: "Київ", to: "Перемишль" },
    departure: "2026-05-15T06:00:00",
    duration: "9г 11хв", // Додано поле тривалості 
    capacity: 40,        // Додано поле кількості місць 
    price: 1200,
    wagons: [
      { id: 10, type: "Купе", capacity: 32 },
      { id: 11, type: "Люкс", capacity: 12 },
      { id: 12, type: "Плацкарт", capacity: 54 }
    ]
  },
  { 
    id: 2, 
    number: "091К", 
    route: { from: "Київ", to: "Львів" },
    departure: "2026-05-15T22:37:00",
    duration: "7г 23хв", // Додано
    capacity: 36,        // Додано
    price: 650,
    wagons: [
      { id: 20, type: "Купе", capacity: 36 },
      { id: 21, type: "Купе", capacity: 36 },
      { id: 22, type: "Люкс", capacity: 18 }
    ]
  },
  { 
    id: 3, 
    number: "007К", 
    route: { from: "Київ", to: "Чернівці" },
    departure: "2026-05-16T20:15:00",
    duration: "12г 05хв", // Додано
    capacity: 54,         // Додано
    price: 800,
    wagons: [
      { id: 30, type: "Плацкарт", capacity: 54 },
      { id: 31, type: "Плацкарт", capacity: 54 },
      { id: 32, type: "Купе", capacity: 36 }
    ]
  },
  { 
    id: 4, 
    number: "043Л", 
    route: { from: "Івано-Франківськ", to: "Київ" },
    departure: "2026-05-16T21:55:00",
    duration: "10г 10хв", // Додано
    capacity: 48,         // Додано
    price: 720,
    wagons: [
      { id: 40, type: "Купе", capacity: 32 },
      { id: 41, type: "Люкс", capacity: 12 }
    ]
  },
  { 
    id: 5, 
    number: "012П", 
    route: { from: "Одеса", to: "Львів" },
    departure: "2026-05-17T21:10:00",
    duration: "11г 40хв", // Додано
    capacity: 32,         // Додано
    price: 950,
    wagons: [
      { id: 50, type: "Купе", capacity: 36 },
      { id: 51, type: "Плацкарт", capacity: 54 },
      { id: 52, type: "Плацкарт", capacity: 54 }
    ]
  },
  { 
    id: 6, 
    number: "015 Kharkiv", 
    route: { from: "Харків", to: "Ясіня" },
    departure: "2026-05-17T15:00:00",
    duration: "18г 20хв", // Додано
    capacity: 40,         // Додано
    price: 1100,
    wagons: [
      { id: 60, type: "Купе", capacity: 32 },
      { id: 61, type: "Купе", capacity: 32 },
      { id: 62, type: "Люкс", capacity: 12 }
    ]
  }
];

let bookings = [];

// Маршрут для всіх потягів
app.get('/api/trains', (req, res) => {
  res.json(trains);
});

// Маршрут для одного потяга (виправляє 404)
app.get('/api/trains/:id', (req, res) => {
  const trainId = parseInt(req.params.id);
  const train = trains.find(t => t.id === trainId);
  if (train) {
    res.json(train);
  } else {
    res.status(404).json({ error: "Train not found" });
  }
});

// Маршрут для бронювань
app.get('/api/bookings/:trainId', (req, res) => {
  const trainId = parseInt(req.params.trainId);
  const reserved = bookings
    .filter(b => b.trainId === trainId)
    .flatMap(b => b.seats);
  res.json(reserved);
});

app.post('/api/bookings', (req, res) => {
  const { trainId, seats, name, phone, email } = req.body;
  
  // Додаємо нове бронювання в масив
  bookings.push({ trainId, seats, name, phone, email });
  
  console.log("Нове бронювання:", req.body);
  res.status(201).json({ message: "Успішно заброньовано!" });
});

app.listen(PORT, () => console.log(`🚀 Сервер працює на порту ${PORT}`));