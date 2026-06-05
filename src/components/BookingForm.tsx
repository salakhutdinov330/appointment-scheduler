import { useState } from 'react';
import type { Booking } from '../types';
import { generateId } from '../utils';
import './BookingForm.css';

interface BookingFormProps {
  date: string;
  time: string;
  onBookingCreated: (booking: Booking) => void;
  onCancel: () => void;
}

function BookingForm({ date, time, onBookingCreated, onCancel }: BookingFormProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;
    onBookingCreated({
      id: generateId(),
      date,
      time,
      name,
      contact,
      purpose
    });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3>Новая запись</h3>
      <p>{date} в {time}</p>
      <input
        placeholder="Ваше имя *"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        placeholder="Телефон или Email *"
        value={contact}
        onChange={e => setContact(e.target.value)}
        required
      />
      <input
        placeholder="Цель встречи"
        value={purpose}
        onChange={e => setPurpose(e.target.value)}
      />
      <div className="form-buttons">
        <button type="submit">Записаться</button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Отмена
        </button>
      </div>
    </form>
  );
}

export default BookingForm;