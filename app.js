const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRouter = require('./src/routes/task-router');
const tasksRouter = require('./src/routes/tasks-router');
const authRouter = require('./src/routes/auth-router')
require('dotenv').config({ path: '.env' });

const port = process.env.HOST_PORT || 5000;
const uri = `mongodb+srv://${process.env.USER_NAME_DB}:${process.env.USER_PASSWORD_DB}@cluster0.5y4qx.mongodb.net/tasks?retryWrites=true&w=majority`
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', taskRouter);
app.use('/api', tasksRouter);
app.use('/api', authRouter);



app.listen(port, () => {
  console.log(`server started on port ${port}`);
  try{
    mongoose.connect(uri)
    console.log('server connected to DB')
  } catch (e) {
    console.log(e)
  }

})
