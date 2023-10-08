import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import TaskList from './Task/TaskList'
import TaskForm from './Task/TaskForm';

const App = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await Axios.get('http://localhost:5000/getData');
      setData(response.data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateData = (updatedData) => {
    setData(updatedData);
  };

  return (
    <div>
      <TaskForm getData={getData} />
      <TaskList data={data} updateData={updateData} />
    </div>
  );
};

export default App;
