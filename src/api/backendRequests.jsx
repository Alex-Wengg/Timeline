import axios from 'axios';

const backendURL = 'https://dizzy-linen-subversion-alexwengg4.replit.app'; 

export const postData = async (items, groups ) => {
  try {
    await axios.post(`${backendURL}/save`, { items, groups });
    alert('Data saved successfully!');
  } catch (error) {
    console.error('There was an error saving the data:', error);
    alert('Failed to save data.');
  }
};

export const getData = async (setItems, setGroups) => {
  try {
    const response = await axios.get(`${backendURL}/data`);
    setItems(response.data.items);
    setGroups(response.data.groups);
  } catch (error) {
    console.error('There was an error loading the data:', error);
  }
};