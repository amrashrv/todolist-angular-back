const Task = require('../models/task-model');

class TaskController {

  async addTask(req, res) {
    try {
      const body = req.body;
      const taskExists = await Task.exists({text: body.text});
      const newTask = await Task.create({...body, userId: req.userId});

      if (taskExists) {
        return res.status(403).send({message: 'this task already exists'}
        )
      }

      res.status(200).send(newTask);
    } catch (e) {
      res.status(500).send(`addTask: ${e}`);
    }
  }

  async editTask(req, res) {
    try {
      const {_id, text} = req.body;
      const updatedTask = await Task.updateOne({_id}, req.body);

      if (text === '') {
        return res.status(400).send({message: 'text should not be empty'});
      }

      res.status(200).send(updatedTask);
    } catch (e) {
      res.status(500).send(`editTask: ${e}`);
    }
  }

  async deleteTask(req, res) {
    try {
      const _id = req.query._id;
      const result = await Task.deleteOne({_id});

      res.status(200).send(result);
    } catch (e) {
      res.status(500).send(`deleteTask: ${e}`);
    }
  }
}

module.exports = new TaskController();