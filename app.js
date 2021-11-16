const express = require('express');
const mongoose = require('mongoose')
const taskRouter = require('./src/routes/tasks-router')

const uri = `mongodb+srv://amir:user@cluster0.5y4qx.mongodb.net/tasks?retryWrites=true&w=majority`
const app = express();
const port = process.env.HOST_PORT || 5000;
app.use(express.json());

app.use('/tasks', taskRouter);


app.listen(port, () => {
  console.log(`server started on port ${port}`);
  try{
    mongoose.connect(uri)
    console.log('server connected to DB')
  } catch (e) {
    console.log(e)
  }

})
