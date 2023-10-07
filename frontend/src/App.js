import Axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/getData");
      setData(response.data);
      // console.log('Response from server:', response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [msg, setSData] = useState("");
  const userData = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post("http://localhost:5000/getData", {
        id: Math.random(),
        msg: msg,
      });

      console.log("Response from server:", response.data);
      console.log(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const del = (clickedId) => {
    setData(data.filter((item) => item.id !== clickedId));
  };
  const [editId, setEditId] = useState(null); // ID of the item being edited
  const [newVal, setNewVal] = useState("");

  const edit = (id) => {
    setEditId(id);
  };

  const updateTask = (id) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, msg: newVal } : item))
    );

    setEditId(null);
    setNewVal("");
  };

  return (
    <div>
      <h1>data</h1>

      <form action="POST">
        <label>task</label>
        <input
          type="text"
          name="task"
          onChange={(event) => {
            setSData(event.target.value);
          }}
        />

        <button type="submit" onClick={userData}>
          Add
        </button>
      </form>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {editId === item.id ? (
              <div>
                <input
                  type="text"
                  value={newVal}
                  onChange={(event) => {
                    setNewVal(event.target.value);
                  }}
                />
                <button onClick={() => updateTask(item.id)}>Update</button>
              </div>
            ) : (
              <p>
                Message: {item.msg}
                <input
                  type="checkbox"
                  value={item.id}
                  onClick={() => del(item.id)}
                ></input>
                <button type="button" onClick={() => edit(item.id)}>
                  {" "}
                  Edit
                </button>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
