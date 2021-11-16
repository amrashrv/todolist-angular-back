const Task = require('../models/task-model');

class TasksController {
  async allTasks (req, res){
    console.log(res.data)
  }
  async addTask (req, res){
    try {
      const body = req.body;
      console.log(req.body)
      const newTask = await Task.create(body)
      res.status(200).send({data: newTask});
    } catch (e) {
      console.log(e)
    }
  }
  async editTask(req, res){
    console.log(res.data)
  }
  async deleteTask(req, res){
    console.log(res.data)
  }
}

module.exports = new TasksController();