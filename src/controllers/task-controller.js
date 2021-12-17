const Task = require('../models/task-model');

class TaskController {

  async addTask(req, res) {
    try {
      if (req.body) {
        const body = req.body;
        const taskExists = await Task.exists({text: body.text});

        if (!taskExists) {
          const newTask = await Task.create({...body, userId: req.userId});
          delete newTask._doc.userId;
          return res.status(200).send(newTask);
        } else {
          return res.status(409).send({message: 'this task already exists'});
        }
      }
    } catch (e) {
      res.status(500).send({message: `addTask: ${e}`});
    }
  }

  async editTask(req, res) {
    try {
      if (req.body) {
        const {_id, text} = req.body;

        if (text === '') {
          return res.status(400).send({message: 'text should not be empty'});
        }

        const updatedTask = await Task.updateOne({_id}, req.body);
        res.status(200).send(updatedTask);
      }
    } catch (e) {
      res.status(500).send({message: `editTask: ${e}`});
    }
  }

  async deleteTask(req, res) {
    try {
      if (req.query._id) {
        const _id = req.query._id;
        const result = await Task.deleteOne({_id});

        res.status(200).send(result);
      }
    } catch (e) {
      res.status(500).send({message: `deleteTask: ${e}`});
    }
  }
}

module.exports = new TaskController();