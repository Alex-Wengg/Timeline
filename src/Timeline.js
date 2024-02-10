import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Timeline from 'react-calendar-timeline';

import { eventTypeColors, keys } from './TimeLineComponent/constants';
import AddEvent from './TimeLineComponent/AddEvent';
import { MoveEvent, ResizeEvent } from './TimeLineComponent/EditEvent'; // Import utilities
import FilterEvent from './TimeLineComponent/FilterEvent'; // Import the new component
import ListView from './ListView';
import { postData, getData} from './api/backendRequests';


const App = () => {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [defaultTimeStart, setDefaultTimeStart] = useState(moment().startOf('day').toDate());
  const [defaultTimeEnd, setDefaultTimeEnd] = useState(moment().startOf('day').add(1, 'day').toDate());
  const [filterType, setFilterType] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [viewType, setViewType] = useState('timeline');

  useEffect(() => {
    const fetchData = async () => {
      getData(setItems, setGroups);
    };
    fetchData();
  }, []);

  const addNewEvent = (newEventData) => {
    const newItem = {
      id: Math.max(0, ...items.map((item) => item.id)) + 1,
      title: newEventData.title,
      type: newEventData.type,
      start: moment(newEventData.start).valueOf(),
      end: moment(newEventData.end).valueOf(),
      group: 1,
      color: eventTypeColors[newEventData.type],
      itemProps: {
        style: {
          background: eventTypeColors[newEventData.type],
        },
      },
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const saveEdit = (itemId, formData) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              title: formData.title,
              type: formData.type,
              start: moment(formData.start).valueOf(),
              end: moment(formData.end).valueOf(),
              color: eventTypeColors[formData.type],
              itemProps: {
                style: {
                  background: eventTypeColors[formData.type],
                },
              }
            }
          : item
      )
    );
  };

  const filteredAndSearchedItems = items.filter((item) => {
    const matchesType = filterType ? item.type === filterType : true;
    const matchesSearch = searchTitle ? item.title.toLowerCase().includes(searchTitle.toLowerCase()) : true;
    return matchesType && matchesSearch;
  });

  const addNewGroup = () => {
    const newGroup = {
      id: Math.max(0, ...groups.map((group) => group.id)) + 1, // Ensure unique ID
      title: newGroupTitle,
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    setNewGroupTitle('');
  };

    const toggleView = () => {
    setViewType(viewType === 'timeline' ? 'list' : 'timeline');
  };

  const handleSave = () => {
    postData(items, groups);
  };

  return (
    <div>
      <AddEvent onAddEvent={addNewEvent} />
      <FilterEvent
        filterType={filterType}
        setFilterType={setFilterType}
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
      />

      <div>
        <input
          type="text"
          placeholder="Add New Group"
          value={newGroupTitle}
          onChange={(e) => setNewGroupTitle(e.target.value)}
        />
        <button onClick={addNewGroup}>Add Group</button>
        <br></br>
        <button onClick={toggleView}>
          Switch to {viewType === 'timeline' ? 'List' : 'Timeline'} View
        </button>

        <button onClick={handleSave}>
          Save Changes
        </button>
      </div>

      
      {viewType === 'timeline' ? (
        <ListView 
        items={filteredAndSearchedItems}
        onDelete={deleteItem}
        onSaveEdit={saveEdit}
        />
 
            ) : (
 
        <Timeline
        groups={groups}
        items={filteredAndSearchedItems}
        keys={keys}
        fullUpdate
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        canMove={true}
        canResize={'both'}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        onItemMove={(itemId, dragTime, newGroupOrder) =>
          MoveEvent(itemId, dragTime, newGroupOrder, items, groups, setItems)}
        onItemResize={(itemId, time, edge) =>
          ResizeEvent(itemId, time, edge, items, setItems)}
      >

      </Timeline>
      )}
    </div>
  );
};

export default App;
