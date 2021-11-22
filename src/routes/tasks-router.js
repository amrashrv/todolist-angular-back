const router = require('express').Router();
const tasksController = require('../controllers/tasks-controller')

router.get('/tasks', tasksController.getAllTasks);
router.patch('/tasks', tasksController.editAllTasks);

module.exports = router;