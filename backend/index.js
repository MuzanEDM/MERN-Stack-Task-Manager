const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(cors());

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase().catch((err) => console.log(err));

const itemSchema = new mongoose.Schema({
  id: Number,
  msg: String,
});

const Task = mongoose.model("Task", itemSchema);

app.get("/", cors(), (req, res) => {
  res.send("API...");
});

app.get("/getData", async function (req, res) {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      console.log("Zero tasks found");
      try {
        res.json({ id: 1, msg: "coffee" });
        await Task.insertMany({ id: 1, msg: "coffee" });
      } catch (error) {
        console.error(error);
      }
    } else {
      res.json(tasks);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/getData", async (req, res) => {
  try {
    const { id, msg } = req.body;
    const task = new Task({ id, msg });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/delData/:id", async function (req, res) {
  try {
    const taskId = req.params.id;
    await Task.findOneAndDelete({ id: taskId });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
  }
});

app.put("/upData/:id", async function (req, res) {
  try {
    const taskId = req.params.id;
    const newValue = req.body.msg;
    await Task.findOneAndUpdate({ id: taskId }, { msg: newValue });
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000 `);
});
