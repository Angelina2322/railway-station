const BookingForm = ({ onSubmit }) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      onSubmit(Object.fromEntries(formData));
    }}>
      <input name="name" type="text" placeholder="Ім'я" required /> 
      <input name="phone" type="tel" placeholder="Телефон" required /> 
      <input name="email" type="email" placeholder="Email" required /> 
      <button type="submit">Підтвердити бронювання</button>
    </form>
  );
};

export default BookingForm;