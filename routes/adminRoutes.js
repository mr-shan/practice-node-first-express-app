const express = require('express');

const productController = require('./../controllers/product');

const router = express.Router();

router.post('/products', productController.postProduct);
router.get('/add-product', productController.getAddProduct);
router.get('/edit-product/:productId', productController.getEditProduct)
router.patch('/edit-product/:productId', productController.patchEditProduct)

module.exports = router;
