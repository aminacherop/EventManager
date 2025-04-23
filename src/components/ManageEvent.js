import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ManageEvent.css';

function ManageEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/events/${eventId}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(() => {
        Swal.fire('Error', 'Failed to load event details.', 'error');
        navigate('/');
      });
  }, [eventId, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setEvent(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:5000/events/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        Swal.fire({
          title: 'Success',
          text: 'Event updated successfully!',
          icon: 'success',
          confirmButtonColor: '#3085d6'
        }).then(() => navigate('/'));
      })
      .catch(() => Swal.fire('Error', 'Failed to update event.', 'error'));
  }

  if (!event) return <div>Loading...</div>;

  return (
    <div className="manage-event-container">
      <h1 className="manage-event-title">Manage Event</h1>
      <form className="manage-event-form" onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Time</label>
          <input
            type="time"
            name="time"
            value={event.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="manage-event-actions">
          <button type="submit" className="manage-event-button">Save Changes</button>
          <button type="button" className="manage-event-button cancel-button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ManageEvent;
