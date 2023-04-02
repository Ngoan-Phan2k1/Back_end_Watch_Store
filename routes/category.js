const categoryController = require("../controllers/categoryController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();

router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getOneCategory);
router.post("/",middlewareController.verifyTokenAndAdminAuth ,categoryController.createCategory);
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth ,categoryController.deleteCategory);
router.put("/:id",middlewareController.verifyTokenAndAdminAuth ,categoryController.updateCategory);



module.exports = router;