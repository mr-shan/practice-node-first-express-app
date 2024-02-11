const Product = require('./../models/Product');

module.exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('products', {
      pageTitle: 'Shop Mart - Products Home',
      path: '/products',
      products: products
    })
  })
}

module.exports.postProduct = (req, res) => {
  const body = req.body;
  if (body.name.trim() !== '' && body.price.trim() !== '') {
    const newProd = new Product(body.name.trim(), body.price.trim(), body.imageUrl?.trim());
    newProd.save((error) => {
      if (error) {
        console.log(error)
        // handle error, send error page 
      }
      res.redirect('/products');
    });
  } else {
    res.redirect('/add-product');
  }
}

module.exports.getAddProduct = (req, res) => {
  res.render('add-product', {
    pageTitle: 'Shop Mart - Add New Product',
    path: '/add-product'
  })
}