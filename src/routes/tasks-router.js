const router = require('express').Router();
const tasksController = require('../controllers/tasks-controller')

router.get('', tasksController.allTasks);
router.post('', tasksController.addTask);
router.patch('', tasksController.editTask);
router.delete('', tasksController.deleteTask);

module.exports = router;
