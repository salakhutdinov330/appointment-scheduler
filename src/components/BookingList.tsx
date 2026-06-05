import type { Booking } from '../types';
import './BookingList.css';

interface BookingListProps {
  bookings: Booking[];
  selectedDate: string;
  onDelete: (id: string) => void;
}

function BookingList({ bookings, selectedDate, onDelete }: BookingListProps) {
  const filtered = bookings.filter(b => b.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="booking-list">
      <h3>Записи на {selectedDate}</h3>
      {filtered.length === 0 ? (
        <p className="no-bookings">Нет записей на этот день</p>
      ) : (
        filtered.map(b => (
          <div key={b.id} className="booking-item">
            <span className="booking-time">{b.time}</span>
            <span className="booking-name">{b.name}</span>
            <span className="booking-purpose">{b.purpose}</span>
            <span className="booking-contact">{b.contact}</span>
            <button onClick={() => onDelete(b.id)}>✕</button>
          </div>
        ))
      )}
    </div>
  );
}

export default BookingList;