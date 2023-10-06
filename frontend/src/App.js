import Axios from 'axios';
import { useEffect, useState} from 'react';

const  App=()=> {

const [data,setData]=useState([]);

const getData = async () => {
  try {
    const response = await Axios.get("http://localhost:5000/getData");
    setData(response.data)
    // console.log('Response from server:', response.data);
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

useEffect(()=>{
getData()},
[]);



const [msg,setSData]=useState("")
  const userData = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post('http://localhost:5000/getData',
          { id:Math.random(),
            msg:msg}
       );

      console.log('Response from server:', response.data);
      console.log(data)
    } catch (err) {
      console.error('Error:', err);
    }
  };
  
  return (
    <div>
      <h1>data</h1>

      <form action='POST'>
        <label>task</label>
        <input type='text' name='task' onChange={(event)=>{setSData(event.target.value)}}/>
        <button type='submit' onClick={userData}>Add</button>
      </form>

      <ul>
      {data.map((item) => (
  <li key={item.id}>
    <p>Message: {item.msg}</p>
  </li>
  
))}
</ul>
    </div>
  );
}


export default App;
