const router = require('express').Router();
const receiptController = require('../controllers/receiptController');
const middlewareController = require("../controllers/middlewareController");

router.get('/' ,receiptController.getReceipts);
router.post('/' ,receiptController.createReceipt);
//router.post('/',middlewareController.verifyToken ,paymentController.createPayments);

module.exports = router;