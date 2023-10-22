import React, { useState } from "react";
import Axios from "axios";
import Card from "../UI/Card";
import classes from "./TaskList.module.css";

const TaskList = ({ data, updateData }) => {
  const [editId, setEditId] = useState(null);
  const [newVal, setNewVal] = useState("");

  const handleEdit = (id) => {
    setEditId(id);
  };

  // updation (edit) of task

  const handleUpdateTask = async (taskId) => {
    try {
      await Axios.put(`https://mern-stack-task-manager-two.vercel.app/upData/${taskId}`, {
        msg: newVal,
      });
      updateData((prevData) =>
        prevData.map((item) =>
          item.id === taskId ? { ...item, msg: newVal } : item
        )
      );
      setEditId(null);
      setNewVal("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  //deletion of task

  const handleDelete = async (taskId) => {
    try {
      await Axios.delete(`https://mern-stack-task-manager-two.vercel.app/delData/${taskId}`);
      updateData(data.filter((item) => item.id !== taskId));
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <ul className={classes.ul}>
      {data.map((item) => (
        <Card key={item.id} className={classes.card}>
          <li className={classes.li}>
            {editId === item.id ? (
              <div>
                <input
                  className={classes.input}
                  type="text"
                  value={newVal}
                  onChange={(event) => setNewVal(event.target.value)}
                />
                <button
                  className={classes.button}
                  type="button"
                  onClick={() => handleUpdateTask(item.id)}
                >
                  Update
                </button>
              </div>
            ) : (
              <div className={classes.btnGroup}>
                <p className={classes.p}>{item.msg}</p>
                <div className={classes.btnGroup}>
                  <button
                    className={classes.button}
                    type="checkbox"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={classes.button}
                    type="button"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </li>
        </Card>
      ))}
    </ul>
  );
};

export default TaskList;
