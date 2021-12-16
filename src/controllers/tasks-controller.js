const Task = require('../models/task-model');

class TasksController {

  async getAllTasks(req, res) {
    try {
      const allTasks = await Task.find({userId: req.userId});

      res.status(200).send(allTasks);
    } catch (e) {
      res.status(500).send(`allTasks: ${e}`);
    }
  }

  async editAllTasks(req, res) {
    try {
      await Task.updateMany({userId: req.userId}, {done: req.body.done});
      const tasks = await Task.find({userId: req.userId});

      res.status(200).send(tasks);
    } catch (e) {
      res.status(500).send(`editAllTasks: ${e}`);
    }
  }

  async removeCompletedTasks(req, res) {
    try {
      const ids = [];
      const completedTasks = await Task.find({userId: req.userId, done: true});
      completedTasks.map(item => {
        ids.push(item._id);
      })
      await Task.deleteMany({userId: req.userId, done: true});
      res.status(200).send(ids);
    } catch (e) {
      res.status(500).send(`deleteAllDone: ${e}`);
    }
  }
}

module.exports = new TasksController();