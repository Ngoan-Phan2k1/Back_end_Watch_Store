const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProduct);
router.get("/notFilter", productController.getAllProductNotFilter);
router.get("/:id", productController.getOneProduct);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
module.exports = router;