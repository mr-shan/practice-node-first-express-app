const path = require('path');

const express = require('express');

const rootPath = require('./../helpers/path');

const router = express.Router();

const productsList = [

];

router.get('/products', (req, res) => {
  res.render('products', {
    pageTitle: 'Shop Mart - Products Home',
    path: '/products',
    products: productsList
  })
});

router.post('/products', (req, res) => {
  const body = req.body;
  if (body.name.trim() !== '' && body.price.trim() !== '') {
    productsList.push({
      id: productsList.length + 1,
      name: body.name.trim(),
      price: body.price.trim(),
      img: body.imageUrl.trim() || 'https://icon-library.com/images/product-icon-png/product-icon-png-19.jpg',
    });
    res.redirect('/products');
  } else {
    res.redirect('/add-product');
  }
});

router.get('/add-product', (req, res) => {
  // res.sendFile(path.join(rootPath, 'views', 'add-product.html'));
  res.render('add-product', {
    pageTitle: 'Shop Mart - Add New Product',
    path: '/add-product'
  })
});

module.exports = router;
