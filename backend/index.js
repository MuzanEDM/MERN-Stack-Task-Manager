const express = require('express');
const bodyParser = require('body-parser');
 const Task=require('./mongo')
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
// app.use(express.urlencoded,({extended:'true'}))
app.use(cors())

var data=[{
  id:'1',
  msg:'ho'
}]
app.get('/',cors(),(req,res)=>{
res.send('api...')
})


app.get('/getData',(req,res)=>{
  res.json(data)

})

app.post('/getData', async (req, res) => {
  try {
    const msg = req.body;
    data.push(msg);
    console.log(req.body);
    res.json(data);
    
    // Insert data into MongoDB using the Task model
    //  Task.insertMany([data]); // Assuming msg is an array of data to be inserted
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
    res.redirect('/getData')
  }
});







const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
