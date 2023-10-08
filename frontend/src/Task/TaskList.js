import React, { useState } from 'react';
import Axios from 'axios';

const TaskList = ({ data, updateData }) => {
  const [editId, setEditId] = useState(null);
  const [newVal, setNewVal] = useState('');

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleUpdateTask = async (taskId) => {
    try {
      await Axios.put(`http://localhost:5000/upData/${taskId}`, {
        msg: newVal,
      });
      updateData((prevData) =>
        prevData.map((item) => (item.id === taskId ? { ...item, msg: newVal } : item))
      );
      setEditId(null);
      setNewVal('');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await Axios.delete(`http://localhost:5000/delData/${taskId}`);
      updateData(data.filter((item) => item.id !== taskId));
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          {editId === item.id ? (
            <div>
              <input
                type="text"
                value={newVal}
                onChange={(event) => setNewVal(event.target.value)}
              />
              <button type="button" onClick={() => handleUpdateTask(item.id)}>
                Update
              </button>
            </div>
          ) : (
            <p>
              Message: {item.msg}
              <button type="checkbox" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
              <button type="button" onClick={() => handleEdit(item.id)}>
                Edit
              </button>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
