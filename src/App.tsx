import { useState } from 'react';
import Calendar from './components/Calendar.tsx';
import TimeSlots from './components/TimeSlots.tsx';
import BookingForm from './components/BookingForm.tsx';
import BookingList from './components/BookingList';
import type { Booking } from './types';
import { loadBookings, getToday } from './utils';

function App() {
  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(loadBookings);
  const [editing, setEditing] = useState<boolean>(false);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setEditing(false);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setEditing(true);
  };

  const handleBookingCreated = (booking: Booking) => {
    const updated = [...bookings, booking];
    setBookings(updated);
    localStorage.setItem('appointment-bookings', JSON.stringify(updated));
    setEditing(false);
    setSelectedTime(null);
  };

  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('appointment-bookings', JSON.stringify(updated));
  };

  const bookedTimesForDate = bookings
    .filter(b => b.date === selectedDate)
    .map(b => b.time);

  return (
    <div className="app">
      <h1>📅 Планировщик встреч</h1>
      <div className="app-layout">
        <div className="left-panel">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
          <TimeSlots
            date={selectedDate}
            bookedTimes={bookedTimesForDate}
            onTimeSelect={handleTimeSelect}
          />
        </div>
        <div className="right-panel">
          {editing && selectedDate && selectedTime ? (
            <BookingForm
              date={selectedDate}
              time={selectedTime}
              onBookingCreated={handleBookingCreated}
              onCancel={() => {
                setEditing(false);
                setSelectedTime(null);
              }}
            />
          ) : (
            <p className="hint">Выберите дату и время для записи</p>
          )}
          <BookingList
            bookings={bookings}
            selectedDate={selectedDate}
            onDelete={handleDeleteBooking}
          />
        </div>
      </div>
    </div>
  );
}

export default App;