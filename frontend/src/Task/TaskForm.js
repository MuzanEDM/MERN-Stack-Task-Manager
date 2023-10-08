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
    <form className={classes.form}onSubmit={handleAddTask}>
      <h1 className={classes.h1}>Add Task</h1>
      <input
      className={classes.input}
        type="text"
        name="task"
        value={msg}
        autoComplete='off'
        onChange={(event) => setMsg(event.target.value)}
      />
      <button className={classes.button} type="submit">+</button>
    </form>
    
    </Fragment>
  );
};

export default TaskForm;
