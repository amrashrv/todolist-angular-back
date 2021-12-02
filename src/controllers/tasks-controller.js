const Task = require('../models/task-model');

class TasksController {
  async getAllTasks(req, res) {
    try {
      const allTasks = await Task.find({userId: req.userId});
      res.status(200).send({data: allTasks});
    } catch(e) {
      res.status(500).send(`allTasks: ${e}`);
    }
  }
  async editAllTasks(req, res) {
    try {
        await Task.updateMany({userId: req.userId}, {done: req.body.done});
        const tasks = await Task.find({userId: req.userId})
        res.status(200).send({data: tasks})
    } catch (e) {
      res.status(500).send(`editAllTasks: ${e}`)
    }
  }
  async deleteAllDone(req, res) {
    try {
      const ids = [];
      const doneTasks = await Task.find({userId: req.userId, done: true});
      doneTasks.map(item => {
        ids.push(item._id);
      })
      await Task.deleteMany({userId: req.userId, done: true});
      res.status(200).send({data: ids});
    } catch (e) {
      res.status(500).send(`deleteAllDone: ${e}`)
    }
  }
}

module.exports = new TasksController();