const router = require('express').Router();
const tasksController = require('../controllers/tasks-controller');
const middleware = require('../middleware/middleware');

router.get('/tasks', middleware.checkJwt, tasksController.getAllTasks);
router.patch('/tasks', middleware.checkJwt, tasksController.editAllTasks);
router.delete('/tasks', middleware.checkJwt, tasksController.deleteAllDone)

module.exports = router;