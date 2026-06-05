import './TimeSlots.css';

interface TimeSlotsProps {
  date: string;
  bookedTimes: string[];
  onTimeSelect: (time: string) => void;
}

function TimeSlots({ date, bookedTimes, onTimeSelect }: TimeSlotsProps) {
  const slots: string[] = [];
  for (let h = 9; h <= 17; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 17) slots.push(`${String(h).padStart(2, '0')}:30`);
  }

  return (
    <div className="time-slots">
      <h3>Время на {date}</h3>
      <div className="slots-grid">
        {slots.map(time => {
          const isBooked = bookedTimes.includes(time);
          return (
            <button
              key={time}
              className={`slot ${isBooked ? 'booked' : 'free'}`}
              disabled={isBooked}
              onClick={() => onTimeSelect(time)}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TimeSlots;
