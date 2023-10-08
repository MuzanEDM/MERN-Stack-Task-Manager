import React, { useState,Fragment } from 'react';
import Axios from 'axios';
import classes from './TaskForm.module.css'

const TaskForm = ({ getData }) => {
  const [msg, setMsg] = useState('');

  const handleAddTask = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post('http://localhost:5000/getData', {
        id: Math.random(),
        msg: msg,
      });

      console.log('Response from server:', response.data);
      getData();
    } catch (err) {
      console.error('Error:', err);
    }

    setMsg('');
  };

  return (
    <Fragment>
    <form onSubmit={handleAddTask}>
      <label>Task</label>
      <input
        type="text"
        name="task"
        value={msg}
        onChange={(event) => setMsg(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
    </Fragment>
  );
};

export default TaskForm;
