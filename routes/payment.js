const router = require('express').Router();
const paymentController = require('../controllers/paymentController');
const middlewareController = require("../controllers/middlewareController");

router.get('/',middlewareController.verifyTokenAndAdminAuth ,paymentController.getPayments);
router.post('/',middlewareController.verifyToken ,paymentController.createPayments);

module.exports = router;