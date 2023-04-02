const router = require("express").Router();
const warehouseController = require("../controllers/warehouseController");

router.get("/", warehouseController.getAllWareHouse);
router.get("/:id", warehouseController.getOneWareHouse);
// router.get("/notFilter", productController.getAllProductNotFilter);
router.post("/", warehouseController.createWarehouse);
// router.put("/:id", productController.updateProduct);
// router.delete("/:id", productController.deleteProduct);
module.exports = router;