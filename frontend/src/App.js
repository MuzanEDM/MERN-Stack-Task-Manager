import React, { useEffect, useState } from "react";
import Axios from "axios";
import TaskList from "./Task/TaskList";
import TaskForm from "./Task/TaskForm";
import Card from "./UI/Card";
import classes from "./App.module.css";
const App = () => {
  const [data, setData] = useState([]);

  //loading,fetching the tasks

  const getData = async () => {
    try {
      const response = await Axios.get("https://mern-stack-task-manager-two.vercel.app/getData");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      <Card className={classes.Card}>
        <h1 className={classes.h1}>Task List</h1>
      </Card>
      <div className={classes["flex-container"]}>
        <TaskForm getData={getData} />
        <TaskList data={data} updateData={updateData} />
      </div>
    </div>
  );
};

export default App;
