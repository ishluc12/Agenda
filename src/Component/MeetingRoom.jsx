import React, { useState } from 'react';

function MeetingRoom() {
  const [meetings, setMeetings] = useState([]); // To store meeting details
  const [formData, setFormData] = useState({
    roomName: '',
    meetingTime: '',
    participants: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.roomName && formData.meetingTime && formData.participants) {
      setMeetings([...meetings, formData]);
      setFormData({ roomName: '', meetingTime: '', participants: '' }); // Clear the form
    } else {
      alert('Please fill all fields.');
    }
  };

  return (
    <div className="meeting-room">
      <h1>Meeting Room Management</h1>
      <form onSubmit={handleSubmit} className="meeting-form">
        <div>
          <label>Room Name:</label>
          <input
            type="text"
            name="roomName"
            value={formData.roomName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Meeting Time:</label>
          <input
            type="datetime-local"
            name="meetingTime"
            value={formData.meetingTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Participants:</label>
          <input
            type="text"
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            placeholder="Enter names separated by commas"
            required
          />
        </div>
        <button type="submit">Add Meeting</button>
      </form>

      <div className="meeting-list">
        <h2>Scheduled Meetings</h2>
        {meetings.length > 0 ? (
          meetings.map((meeting, index) => (
            <div key={index} className="meeting-item">
              <h3>Room: {meeting.roomName}</h3>
              <p>Time: {new Date(meeting.meetingTime).toLocaleString()}</p>
              <p>Participants: {meeting.participants}</p>
            </div>
          ))
        ) : (
          <p>No meetings scheduled yet.</p>
        )}
      </div>
    </div>
  );
}

export default MeetingRoom;
