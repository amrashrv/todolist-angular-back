const router = require("express").Router();
const taskController = require("../controllers/task-controller");
const middleware = require("../middleware/middleware");

router.post("/task", middleware.checkJwt, taskController.addTask);
router.patch("/task", middleware.checkJwt, taskController.editTask);
router.delete("/task", middleware.checkJwt, taskController.deleteTask);

module.exports = router;
