import React from 'react';
import { eventTypeColors } from './constants';

const FilterEvent = ({ filterType, setFilterType, searchTitle, setSearchTitle }) => {
  return (
    <div>
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="">All Types</option>
        {Object.keys(eventTypeColors).map((type) => (
          <option style={{ "backgroundColor": eventTypeColors[type], "color" : "white"}} key={type} value={type}>{type}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />
    </div>
  );
};

export default FilterEvent;
