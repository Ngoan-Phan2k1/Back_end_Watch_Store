const sanphamController = require("../controllers/sanphamController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

//ADD sapham
router.post("/", middlewareController.verifyTokenAndAdminAuth, sanphamController.addSanpham);

//GET ALL sanpham
router.get("/", sanphamController.getAllsanpham);

//GET 1  sanpham
router.get("/:id", sanphamController.getOnesanpham);

//UPDATE 1 SANPHAM
router.put("/:id", middlewareController.verifyTokenAndAdminAuth,sanphamController.updateSanpham);

//DELETE SAN PHAM
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth,sanphamController.deleteSanpham);


module.exports = router;