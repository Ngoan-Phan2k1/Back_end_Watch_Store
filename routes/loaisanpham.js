const loaiController = require("../controllers/loaisanphamController");
const router = require("express").Router();


//ADD 1 LOAI
router.post("/", loaiController.addLoai);

//GET ALL LOAI
router.get("/", loaiController.getAllLoai);

//GET 1 LOAI
router.get("/:id", loaiController.getOneLoai);

//UPDATE 1 LOAI
router.put("/:id", loaiController.updateLoai);

//DELETE 
router.delete("/:id", loaiController.deleteLoai);

module.exports = router;

