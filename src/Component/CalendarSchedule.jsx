import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlus, FaTimes } from 'react-icons/fa';
import Dashboard from './Dashboard';
import './CalendarSchedule.css';

const CalendarSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', time: '' });
  const [showEventForm, setShowEventForm] = useState(false);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setShowEventForm(false);
  };

  const handleEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const addEvent = () => {
    if (selectedDate && newEvent.title) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDate}`;
      setEvents({
        ...events,
        [dateKey]: [...(events[dateKey] || []), newEvent]
      });
      setNewEvent({ title: '', description: '', time: '' });
      setShowEventForm(false);
    }
  };

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
      const hasEvents = events[dateKey] && events[dateKey].length > 0;
      days.push(
        <div
          key={day}
          className={`day ${selectedDate === day ? 'selected' : ''} ${hasEvents ? 'has-events' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
          {hasEvents && <div className="event-dot"></div>}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-schedule">
        <div className="calendar-header">
          <button onClick={prevMonth}><FaChevronLeft /></button>
          <h2>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <button onClick={nextMonth}><FaChevronRight /></button>
        </div>
        <div className="calendar-grid">
          <div className="weekday">Sun</div>
          <div className="weekday">Mon</div>
          <div className="weekday">Tue</div>
          <div className="weekday">Wed</div>
          <div className="weekday">Thu</div>
          <div className="weekday">Fri</div>
          <div className="weekday">Sat</div>
          {renderCalendar()}
        </div>
      </div>
      <div className="event-panel">
        {selectedDate && (
          <>
            <h3>{months[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}</h3>
            {!showEventForm && (
              <button className="add-event-btn" onClick={() => setShowEventForm(true)}>
                <FaPlus /> Add Event
              </button>
            )}
            {showEventForm && (
              <div className="event-form">
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleEventChange}
                  placeholder="Event Title"
                />
                <input
                  type="time"
                  name="time"
                  value={newEvent.time}
                  onChange={handleEventChange}
                />
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleEventChange}
                  placeholder="Event Description"
                ></textarea>
                <div className="form-buttons">
                  <button onClick={addEvent}>Add Event</button>
                  <button onClick={() => setShowEventForm(false)}><FaTimes /></button>
                </div>
              </div>
            )}
            <div className="event-list">
              {events[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDate}`]?.map((event, index) => (
                <div key={index} className="event">
                  <h4>{event.title}</h4>
                  <p>{event.time}</p>
                  <p>{event.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Dashboard events={events} currentDate={currentDate} />
    </div>
  );
};

export default CalendarSchedule;