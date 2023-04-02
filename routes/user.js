const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const router = require("express").Router();

//GET ALL USER
router.get("/",middlewareController.verifyToken, userController.getAllUsers);
router.get("/infor",middlewareController.verifyToken, userController.getOneUser);

//DELETE USER
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

//ADD CART USER
router.patch("/addCart", middlewareController.verifyToken, userController.addCart);

router.patch("/addBookmark", middlewareController.verifyToken, userController.addBookmark);


//GET HISTORY USER
router.get("/history", middlewareController.verifyToken, userController.getHistory);
module.exports = router;