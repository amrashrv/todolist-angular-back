const Task = require('../models/task-model');

class TasksController {
  async getAllTasks(req, res) {
    try {
      const allTasks = await Task.find()
      res.status(200).send({data: allTasks});
    } catch(e) {
      res.status(500).send(`allTasks: ${e}`);
    }
  }
  async addTask(req, res) {
    try {
      const body = req.body;
      const newTask = await Task.create(body)
      res.status(200).send({data: newTask});
    } catch (e) {
      res.status(500).send(`addTask: ${e}`);
    }
  }
  async editTask(req, res) {
    try {
      const body = req.body
      const task = await Task.updateOne({_id: body._id}, body);
      res.status(200).send({data: task});
    } catch (e) {
      res.status(500).send(`editTask: ${e}`);
    }
  }
  async deleteTask(req, res) {
    try {
      const id = req.query._id;
      const task = await Task.deleteOne({_id: id});
      res.status(200).send({data: task})
    } catch (e) {
      res.status(500).send(`deleteTask: ${e}`);
    }
  }
  async editAllTasks(req, res) {
    try {
        const body = req.body;
        const tasks = await Task.updateMany({}, {body});
        res.status(200).send({data: tasks})
    } catch (e) {
      res.status(500).send(`editAllTasks: ${e}`)
    }
  }
}

module.exports = new TasksController();