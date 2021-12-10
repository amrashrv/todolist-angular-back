const Task = require('../models/task-model');

class TaskController {

  async addTask(req, res) {
    try {
      const body = req.body;
      const newTask = await Task.create({...body, userId: req.userId});
      res.status(200).send(newTask);
    } catch (e) {
      res.status(500).send(`addTask: ${e}`);
    }
  }
  async editTask(req, res) {
    try {
      const body = req.body
      if(body.text === '' ){
        return res.status(400).send({message: 'text should not be empty'})
      }
      const task = await Task.updateOne({_id: body._id}, body);
      res.status(200).send(task);
    } catch (e) {
      res.status(500).send(`editTask: ${e}`);
    }
  }
  async deleteTask(req, res) {
    try {
      const id = req.query._id;
      const result = await Task.deleteOne({_id: id});
      res.status(200).send(result)
    } catch (e) {
      res.status(500).send(`deleteTask: ${e}`);
    }
  }
}

module.exports = new TaskController();