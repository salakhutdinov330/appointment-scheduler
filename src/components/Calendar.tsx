import { useState } from 'react';
import { getToday } from '../utils';
import './Calendar.css';

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const today = getToday();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days: (number | null)[] = [];

  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const dateStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>←</button>
        <span>{monthNames[month]} {year}</span>
        <button onClick={nextMonth}>→</button>
      </div>
      <div className="calendar-grid">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(d => (
          <div key={d} className="calendar-day-name">{d}</div>
        ))}
        {days.map((day, i) => (
          <div
            key={i}
            className={
              `calendar-day ${day ? '' : 'empty'} ${
                day && dateStr(day) === selectedDate ? 'selected' : ''
              } ${day && dateStr(day) < today ? 'past' : ''}`
            }
            onClick={() => {
              if (day && dateStr(day) >= today) onDateSelect(dateStr(day));
            }}
          >
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;