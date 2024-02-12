const express = require('express');

const cartController = require('./../controllers/cart');

const router = express.Router();

router.get('/cart', cartController.getCart);
router.post('/cart', cartController.addToCart);
router.post('/cart/:productId', cartController.deleteCart);

module.exports = router;
