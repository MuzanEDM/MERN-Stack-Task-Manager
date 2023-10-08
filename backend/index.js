const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(bodyParser.json());
// app.use(express.urlencoded,({extended:'true'}))
app.use(cors());

main().catch(err => console.log(err));

async function main() {

 await mongoose.connect('mongodb://127.0.0.1:27017/test') 
 const itemSchema = {
  id:Number,
  msg:String
 }
 const Task = mongoose.model('Task',itemSchema)
 const data1 = new Task(
  {
    id: 1,
    msg: "coffee",
  },
);

const defaultTask =[data1,]


app.get("/", cors(), (req, res) => {
  res.send("api...");
});

app.get("/getData",async function(req, res){
  try{
    const tasks=await Task.find();
if(tasks.length==0){
  console.log("zero tasks found");
  try{
    res.json(data1);
    Task.insertMany(data1);
  }
  catch{
}

  }

  else{
    
  res.json(tasks);
  }
}

catch(err){
  console.log(err);
}
});

app.post("/getData", async (req, res) => {
  try {
    
    const msg = req.body;
    await Task.insertMany(msg);
      const tasks=await Task.findOne(msg);
    console.log(req.body);
   
    
    res.json(tasks);
   
   
    
    // Insert data into MongoDB using the Task model
    //  Task.insertMany([data]); // Assuming msg is an array of data to be inserted
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




app.delete('/getData/:id', async function(req, res) {
 
  const taskId = req.params.id;
  // Add this line to log the requested URL

    console.log('Requested URL:', taskId);  
  await Task.findOneAndDelete({_id:taskId})
    res.json({ success: true });
  
});







}
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
