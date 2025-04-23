import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ManageGuests.css';

function ManageGuests() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({ name: '', status: 'coming' });

  useEffect(() => {
    fetch(`http://localhost:5000/events/${eventId}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setGuests(data.guests || []);
      });
  }, [eventId]);

  function updateEventGuests(updatedGuests) {
    const updatedEvent = { ...event, guests: updatedGuests };
    setEvent(updatedEvent);
    setGuests(updatedGuests);
    fetch(`http://localhost:5000/events/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent)
    });
  }

  function handleGuestChange(id, field, value) {
    const updated = guests.map(g => g.id === id ? { ...g, [field]: value } : g);
    updateEventGuests(updated);
  }

  function handleRemoveGuest(id) {
    const updated = guests.filter(g => g.id !== id);
    updateEventGuests(updated);
  }

  function handleNewGuestChange(field, value) {
    setNewGuest(prev => ({ ...prev, [field]: value }));
  }

  function handleAddGuest(e) {
    e.preventDefault();
    const guestToAdd = { id: Date.now(), ...newGuest };
    updateEventGuests([...guests, guestToAdd]);
    setNewGuest({ name: '', status: 'coming' });
  }

  if (!event) return <div>Loading...</div>;

  const coming = guests.filter(g => g.status === 'coming').length;
  const notComing = guests.filter(g => g.status === 'not coming').length;
  const maybe = guests.filter(g => g.status === 'maybe').length;

  return (
    <div className="manage-guests-container">
      <div className="guests-header">
        <img src={event.imageUrl} alt="event" className="header-image" />
        <div className="header-details">
          <h1>{event.title}</h1>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
        </div>
        <div className="header-stats">
          <h3>Guest Statistics</h3>
          <p>Coming: {coming}</p>
          <p>Not Coming: {notComing}</p>
          <p>Maybe: {maybe}</p>
        </div>
      </div>

      <div className="guests-list-section">
        <h2>Manage Guests</h2>
        {guests.map(guest => (
          <div key={guest.id} className="guest-card">
            <input
              type="text"
              value={guest.name}
              onChange={e => handleGuestChange(guest.id, 'name', e.target.value)}
            />
            <select
              value={guest.status}
              onChange={e => handleGuestChange(guest.id, 'status', e.target.value)}
            >
              <option value="coming">Coming</option>
              <option value="not coming">Not Coming</option>
              <option value="maybe">Maybe</option>
            </select>
            <button onClick={() => handleRemoveGuest(guest.id)}>Remove</button>
          </div>
        ))}

        <h2>Add New Guest</h2>
        <form onSubmit={handleAddGuest} className="add-guest-form">
          <input
            type="text"
            placeholder="Guest Name"
            value={newGuest.name}
            onChange={e => handleNewGuestChange('name', e.target.value)}
            required
          />
          <select
            value={newGuest.status}
            onChange={e => handleNewGuestChange('status', e.target.value)}
          >
            <option value="coming">Coming</option>
            <option value="not coming">Not Coming</option>
            <option value="maybe">Maybe</option>
          </select>
          <button type="submit">Add Guest</button>
        </form>
      </div>
    </div>
  );
}

export default ManageGuests;
