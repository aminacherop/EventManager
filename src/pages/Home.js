import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';

function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(function () {
    fetch('http://localhost:5000/events')
      .then(function (res) { return res.json(); })
      .then(function (data){ const eventWithStringsIds = data.map(event =>({
        ...event,
        id:event.id.toString()
      }));
      setEvents(eventWithStringsIds)
    })
  }, []);

  function getStatus(dateString) {
    const today = new Date();
    const eventDate = new Date(dateString);
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

    if (eventDateOnly.getTime() === todayDateOnly.getTime()) return 'today';
    if (eventDateOnly.getTime() > todayDateOnly.getTime()) return 'upcoming';
    return 'past';
  }

  const filteredEvents = events.filter(function (event) {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const status = getStatus(event.date);
    const matchesFilter = filter === 'all' || filter === status;
    return matchesSearch && matchesFilter;
  });

  function toggleExpand(id) {
    setExpandedId(expandedId === id ? null : id);
  }

  const navigate = useNavigate();

function handleEdit(id) {
  navigate(`/manage-event/${id}`);
}

function handleManage(id) {
  navigate(`/manage-guests/${id}`);
}


  return (
    <div className="container">
      <h1 className="page-title">Event Manager</h1>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search events by name..."
          value={search}
          onChange={function (e) { setSearch(e.target.value); }}
        />

        <select value={filter} onChange={function (e) { setFilter(e.target.value); }}>
          <option value="all">All Events</option>
          <option value="upcoming">Upcoming</option>
          <option value="today">Today</option>
          <option value="past">Past</option>
        </select>
      </div>

      <div className="event-grid">
        {filteredEvents.map(function (event) {
          const status = getStatus(event.date);
          const isExpanded = expandedId === event.id;
          return (
            <div className="event-card" key={event.id}>
              <img src={event.imageUrl} alt={event.title} className="event-image" />
              <div className="event-info">
                <span className={`status-badge status-${status}`}>{status.toUpperCase()}</span>
                <h2 className="event-title">{event.title}</h2>
                <p className="event-meta">{event.date} at {event.time}</p>
                <p className="event-meta">{event.location}</p>
                <div className="action-buttons">
                  <button className="view-button" onClick={function () { toggleExpand(event.id); }}>
                    {isExpanded ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                {isExpanded && (
                  <div>
                    <p className="event-description">{event.description}</p>
                    <div className="action-buttons">
                    <button className="edit-button" onClick={function () { handleEdit(event.id); }}>Edit</button>
                    <button className="manage-button" onClick={function () { handleManage(event.id); }}>Manage Guests</button>

                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
