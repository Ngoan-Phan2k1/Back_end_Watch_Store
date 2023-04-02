const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

//RESGISTER
router.post("/register", authController.registerUser);

//LOGIN
router.post("/login", authController.loginUser);

//RERESH
router.post("/refresh", authController.requestRefreshToken);

//LOGOUT
router.post("/logout",middlewareController.verifyToken, authController.userLogout);
//router.post("/logout", authController.userLogout);

module.exports = router;