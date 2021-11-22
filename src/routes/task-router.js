const router = require('express').Router();
const taskController = require('../controllers/task-controller')

router.post('/task', taskController.addTask);
router.patch('/task', taskController.editTask);
router.delete('/task', taskController.deleteTask);

module.exports = router;
