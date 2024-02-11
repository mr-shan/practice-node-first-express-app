const express = require('express');

const productController = require('./../controllers/product');

const router = express.Router();

router.get('/products', productController.getProducts);
router.post('/products', productController.postProduct);
router.get('/add-product', productController.getAddProduct);

module.exports = router;
