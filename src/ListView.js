import React, { useState } from 'react';
import moment from 'moment';
import { eventTypeColors } from './TimeLineComponent/constants';

const ListView = ({ items, onDelete, onSaveEdit }) => {
  const sortedItems = [...items].sort((a, b) => a.start - b.start);
  const [editItemId, setEditItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    type: '',
    start: '',
    end: '',
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditClick = (item) => {

    setEditItemId(item.id);
    setEditFormData({
      title: item.title,
      type: item.type,
      start: moment(item.start).format('YYYY-MM-DD'),
      end: moment(item.end).format('YYYY-MM-DD'),
    });
  };


  const handleEditSave = () => {
    onSaveEdit(editItemId, editFormData);
    setEditItemId(null);
  };

  return (
    <>
    <p> Sorted by Start Date</p>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedItems.map((item) => (
          <tr key={item.id}>
            {editItemId === item.id ? (
              <>
                <td>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <select
                    name="type" 
                    value={editFormData.type}
                    onChange={handleEditChange} 
                    required
                  >
                    {Object.keys(eventTypeColors).map((type) => (
                      <option style={{ backgroundColor: eventTypeColors[type], color: "white" }} key={type} value={type}>
                        {type}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="datetime-local"
                    name="start"
                    value={editFormData.start}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="datetime-local"
                    name="end"
                    value={editFormData.end}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <button onClick={handleEditSave}>Save</button>
                  <button onClick={() => setEditItemId(null)}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{item.title}</td>
                <td style={{ "background" : eventTypeColors[item.type] }}>{item.type}</td>
                <td>{moment(item.start).format('LL')}</td>
                <td>{moment(item.end).format('LL')}</td>
                <td>
                  <button onClick={() => handleEditClick(item)}>Edit</button>
                  <button onClick={() => onDelete(item.id)}>Delete</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default ListView;
