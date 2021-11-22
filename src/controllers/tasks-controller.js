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
  async editAllTasks(req, res) {
    try {
        const body = req.body;
        const tasks = await Task.updateMany({}, {...body, done: true});
        res.status(200).send({data: tasks})
    } catch (e) {
      res.status(500).send(`editAllTasks: ${e}`)
    }
  }
}

module.exports = new TasksController();