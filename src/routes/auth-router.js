const router = require("express").Router();
const authController = require("../controllers/auth-controller");
const validation = require("../middleware/validation");

router.post("/auth/register", validation.validateUserRegister, authController.register);
router.post("/auth/login",validation.validateUserLogin, authController.login);
router.post("/auth/refreshToken", authController.refreshTokens);

module.exports = router;