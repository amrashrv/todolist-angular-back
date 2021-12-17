const Task = require("../models/task-model");

class TasksController {
  async getAllTasks ( req, res) {
    try {
      const allTasks = await Task.find({userId: req.userId})
          .select(["text", "done"]);

      res.status(200).send(allTasks);
    } catch (e) {
      res.status(500).send({message: `allTasks: ${e}`});
    }
  }

  async editAllTasks(req, res) {
    try {
      if (req.body) {
        await Task.updateMany({userId: req.userId}, {done: req.body.done});
        const tasks = await Task.find({userId: req.userId})
            .select(["text", "done"]);

        res.status(200).send(tasks);
      }
    } catch (e) {
      res.status(500).send({message: `editAllTasks: ${e}`});
    }
  }

  async removeCompletedTasks(req, res) {
    try {
      const completedTasks = await Task.find({userId: req.userId, done: true});
      const ids = completedTasks.map((item) => item._id);
      await Task.deleteMany({userId: req.userId, done: true});
      res.status(200).send(ids);
    } catch (e) {
      res.status(500).send({message: `removeCompletedTasks: ${e}`});
    }
  }
}

module.exports = new TasksController();