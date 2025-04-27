import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEvent.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: new Date(),
    time: '',
    location: '',
    description: '',
    imageUrl: '',
    maxAttendees: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value
    });
  };

  
  const handleDateChange = (date) => {
    setEventDetails({
      ...eventDetails,
      date
    });
  };

  
  const validateForm = () => {
    const newErrors = {};
    if (!eventDetails.title) newErrors.title = 'Title is required';
    if (!eventDetails.time) newErrors.time = 'Time is required';
    if (!eventDetails.location) newErrors.location = 'Location is required';
    if (!eventDetails.description) newErrors.description = 'Description is required';
    if (!eventDetails.imageUrl || !/^https?:\/\//.test(eventDetails.imageUrl)) {
      newErrors.imageUrl = 'Please provide a valid image URL';
    }
    if (!eventDetails.maxAttendees || isNaN(eventDetails.maxAttendees) || eventDetails.maxAttendees <= 0) {
      newErrors.maxAttendees = 'Please enter a valid number of attendees';
    }
    if (Object.keys(newErrors).length === 0) {
      return true;
    } else {
      setErrors(newErrors);
      return false;
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formattedDate = eventDetails.date.toISOString().split('T')[0];

      //const newEvent = { ...eventDetails, id: Date.now(), guests: [] };
      const newEvent = { 
        ...eventDetails, 
        date: formattedDate,  // Use formatted date string
        id: Date.now().toString(),
        guests: [] 
      };

      
      await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      });

      
      navigate('/'); // Redirect to the home page after submission
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Add New Event</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            name="title"
            value={eventDetails.title}
            onChange={handleChange}
            className="form-input"
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label>Event Date</label>
          <DatePicker
            selected={eventDetails.date}
            onChange={handleDateChange}
            className="form-input"
            dateFormat="MMMM d, yyyy"
          />
        </div>

        <div className="form-group">
          <label>Event Time</label>
          <input
            type="time"
            name="time"
            value={eventDetails.time}
            onChange={handleChange}
            className="form-input"
          />
          {errors.time && <p className="error-message">{errors.time}</p>}
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={eventDetails.location}
            onChange={handleChange}
            className="form-input"
          />
          {errors.location && <p className="error-message">{errors.location}</p>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
            className="form-input"
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label>Event Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={eventDetails.imageUrl}
            onChange={handleChange}
            className="form-input"
          />
          {errors.imageUrl && <p className="error-message">{errors.imageUrl}</p>}
        </div>

        <div className="form-group">
          <label>Max Attendees</label>
          <input
            type="number"
            name="maxAttendees"
            value={eventDetails.maxAttendees}
            onChange={handleChange}
            className="form-input"
          />
          {errors.maxAttendees && <p className="error-message">{errors.maxAttendees}</p>}
        </div>

        <button type="submit" className="submit-button">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
