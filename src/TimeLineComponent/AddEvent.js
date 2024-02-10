import React, { useState } from 'react';
import moment from 'moment';

import { eventTypeColors } from './constants';

const AddEvent = ({ onAddEvent }) => {
  const [newEvent, setNewEvent] = useState({
    newEventTitle: '',
    newEventType: '',
    newEventStartDate: '',
    newEventEndDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({
      title: newEvent.newEventTitle,
      type: newEvent.newEventType,
      start: moment(newEvent.newEventStartDate).valueOf(),
      end: moment(newEvent.newEventEndDate).valueOf(),
    });
    setNewEvent({
      newEventTitle: '',
      newEventType: '',
      newEventStartDate: '',
      newEventEndDate: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="newEventTitle"
        value={newEvent.newEventTitle}
        onChange={handleInputChange}
        placeholder="Event Title"
        required
      />
      <select
        name="newEventType"
        value={newEvent.newEventType}
        onChange={handleInputChange}
        required

      >
        <option value="">Select Type</option>
        {Object.keys(eventTypeColors).map((type) => (
          <option style={{ "backgroundColor": eventTypeColors[type], "color" : "white"}} key={type} value={type}>{type}</option>
        ))}

      </select>
      <input
        name="newEventStartDate"
        type="datetime-local"
        value={newEvent.newEventStartDate}
        onChange={handleInputChange}
        required

      />
      <input
        name="newEventEndDate"
        type="datetime-local"
        value={newEvent.newEventEndDate}
        onChange={handleInputChange}
        required

      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEvent;
