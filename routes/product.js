const router = require("express").Router();
const productController = require("../controllers/productController");
const middlewareController = require("../controllers/middlewareController")

router.get("/", productController.getAllProduct);
router.get("/notFilter", productController.getAllProductNotFilter);
router.get("/:id", productController.getOneProduct);
router.post("/", productController.createProduct);
router.post("/mobile", productController.createMobileProduct);
router.put("/:id", productController.updateProduct);
router.put("/mobile/:id",middlewareController.verifyTokenAndAdminAuth, productController.updateMobileProduct);
router.delete("/:id", productController.deleteProduct);
router.delete("/mobile/:id",middlewareController.verifyTokenAndAdminAuth, productController.deleteProduct);


module.exports = router;