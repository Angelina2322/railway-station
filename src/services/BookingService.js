export const BookingService = {
  saveBooking: (data) => {
    const history = JSON.parse(localStorage.getItem('bookings') || '[]');
    history.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem('bookings', JSON.stringify(history)); 
  },
  getBookedSeats: (trainId) => {
    const history = JSON.parse(localStorage.getItem('bookings') || '[]');
    return history
      .filter(b => b.trainId === trainId)
      .flatMap(b => b.seats); 
  }
};