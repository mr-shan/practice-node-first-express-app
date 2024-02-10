const path = require('path');

const express = require('express');

const rootPath = require('./../helpers/path');

const router = express.Router();

const productsList = [
  {
    id: 1,
    name: 'Harry Potter Book',
    price: '500',
    category: 'book',
  },
  {
    id: 2,
    name: 'Apple iPhone 15 Pro',
    price: '80,000',
    category: 'mobile',
  },
];

router.get('/products', (req, res) => {
  res.send(`   
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Shop Mart - Products Home</title>
      <link rel="stylesheet" href="css/nav.css">
      <link rel="stylesheet" href="css/all-products.css">
    </head>
    <body>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a class="active" href="/products">All Products</a></li>
          <li style="float: right;"><a href="/add-product">Add New Product</a></li>
        </ul>
      </nav>
      <div class="all-products">
        <h1>All Products</h1>
        <ul>
          ${productsList
            .map(
              (product, index) =>
                '<li style="animation-delay: ' + index * 40 + 'ms">' +
                '<img src="https://icon-library.com/images/product-icon-png/product-icon-png-19.jpg"/>' +
                '<div class="header"><span class="title">' +
                product.name +
                '</span> <span class="price">&#8377;' +
                product.price + '</span></div>' +
                '<button class="btn-add-cart">' + 'Add to Cart</button></li>'
            )
            .join('')}
        </ul>
      </div>
    </body>
    </html>
  `);
});

router.post('/products', (req, res) => {
  const body = req.body;
  if (body.name.trim() !== '' && body.price.trim() !== '') {
    productsList.push({
      id: productsList.length + 1,
      name: body.name.trim(),
      price: body.price.trim(),
    });
    res.redirect('/products');
  } else {
    res.redirect('/add-product');
  }
});

router.get('/add-product', (req, res) => {
  res.sendFile(path.join(rootPath, 'views', 'add-product.html'));
});

module.exports = router;
