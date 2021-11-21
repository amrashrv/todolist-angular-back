const router = require('express').Router();
const tasksController = require('../controllers/tasks-controller')

router.get('/tasks', tasksController.getAllTasks);
router.post('/task', tasksController.addTask);
router.patch('/task', tasksController.editTask);
router.patch('/tasks', tasksController.editAllTasks)
router.delete('/task', tasksController.deleteTask);

module.exports = router;
