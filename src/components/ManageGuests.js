import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ManageGuests.css';

function ManageGuests() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({ name: '', email: '', phone: '', status: 'coming' });

  useEffect(() => {
    fetch(`http://localhost:5000/events/${eventId}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setGuests(data.guests || []);
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to load event or guests.', 'error');
        navigate('/');
      });
  }, [eventId, navigate]);

  function updateEventGuests(updatedGuests) {
    const updatedEvent = { ...event, guests: updatedGuests };
    setEvent(updatedEvent);
    setGuests(updatedGuests);
    fetch(`http://localhost:5000/events/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent)
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(() => Swal.fire('Success', 'Guests updated!', 'success'))
      .catch(() => Swal.fire('Error', 'Could not update guests.', 'error'));
  }

  function handleGuestFieldChange(id, field, value) {
    const updated = guests.map(g => g.id === id ? { ...g, [field]: value } : g);
    setGuests(updated);
  }

  function handleUpdateGuest() {
    updateEventGuests(guests);
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
    setNewGuest({ name: '', email: '', phone: '', status: 'coming' });
  }

  if (!event) return <div>Loading...</div>;

  const comingCount = guests.filter(g => g.status === 'coming').length;
  const notComingCount = guests.filter(g => g.status === 'not coming').length;
  const maybeCount = guests.filter(g => g.status === 'maybe').length;

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
          <p>Coming: {comingCount}</p>
          <p>Not Coming: {notComingCount}</p>
          <p>Maybe: {maybeCount}</p>
        </div>
      </div>

      <div className="guests-list-section">
        <h2>Manage Guests</h2>
        {guests.map(guest => (
          <div key={guest.id} className="guest-card">
            <input
              type="text"
              value={guest.name}
              onChange={e => handleGuestFieldChange(guest.id, 'name', e.target.value)}
              placeholder="Name"
            />
            <input
              type="email"
              value={guest.email}
              onChange={e => handleGuestFieldChange(guest.id, 'email', e.target.value)}
              placeholder="Email"
            />
            <input
              type="tel"
              value={guest.phone}
              onChange={e => handleGuestFieldChange(guest.id, 'phone', e.target.value)}
              placeholder="Phone"
            />
            <select
              value={guest.status}
              onChange={e => handleGuestFieldChange(guest.id, 'status', e.target.value)}
            >
              <option value="coming">Coming</option>
              <option value="not coming">Not Coming</option>
              <option value="maybe">Maybe</option>
            </select>
            <button className="btn update-btn" onClick={handleUpdateGuest}>Update</button>
            <button className="btn remove-btn" onClick={() => handleRemoveGuest(guest.id)}>Remove</button>
          </div>
        ))}

        <h2>Add New Guest</h2>
        <form onSubmit={handleAddGuest} className="add-guest-form">
          <input
            type="text"
            placeholder="Name"
            value={newGuest.name}
            onChange={e => handleNewGuestChange('name', e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newGuest.email}
            onChange={e => handleNewGuestChange('email', e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newGuest.phone}
            onChange={e => handleNewGuestChange('phone', e.target.value)}
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
          <button type="submit" className="btn add-btn">Add Guest</button>
        </form>
      </div>
    </div>
  );
}

export default ManageGuests;
