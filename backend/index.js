const express = require('express');
const bodyParser = require('body-parser');
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

})


app.get('/getData',(req,res)=>{
  res.json(data)

})

app.post('/getData',(req,res)=>{
  const msg=req.body

  data.push(msg)
  console.log(req.body)
  res.json(data);
}
)



const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
