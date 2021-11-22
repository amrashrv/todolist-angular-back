const router = require('express').Router();
const tasksController = require('../controllers/tasks-controller')

router.get('', tasksController.getTasks);
router.post('', tasksController.addTask);
router.patch('', tasksController.editTask);
router.delete('', tasksController.deleteTask);
router.patch('/allTasks', tasksController.doneAllTasks);

module.exports = router;
