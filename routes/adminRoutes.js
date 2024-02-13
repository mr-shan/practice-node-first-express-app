const express = require('express');

const productController = require('./../controllers/product');

const router = express.Router();

router.post('/products', productController.postProduct);
router.get('/add-product', productController.getAddProduct);
router.get('/edit-product/:productId', productController.getEditProduct);
router.post('/edit-product/:productId', productController.postEditProduct);
router.post('/delete-product/:productId', productController.deleteProduct);

module.exports = router;
