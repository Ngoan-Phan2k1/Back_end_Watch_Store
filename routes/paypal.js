const router = require('express').Router();
const paypalController = require('../controllers/paypalController');
router.get("/paypal/:totalUSD/:userId", paypalController.createPayPal);
router.get("/success/:totalUSD/:userId", paypalController.successPayPal);


module.exports = router;