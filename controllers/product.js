const Product = require('./../models/Product');

module.exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('products', {
      pageTitle: 'Shop Mart - Products Home',
      path: '/products',
      products: products,
    });
  });
};

module.exports.getProductDetails = (req, res, next) => {
  const id = req.params.productId;
  Product.get(id, (product) => {
    if (!product) {
      res
        .status(404)
        .render('404', { pageTitle: '404! Not Found.', path: req.path });
      return;
    } else {
      res.render('product-details', {
        pageTitle: 'Shop Mart - ' + product.name,
        product: product,
        path: '/products',
      });
    }
  });
};

module.exports.postProduct = (req, res) => {
  const body = req.body;
  if (body.name.trim() !== '' && body.price.trim() !== '') {
    const newProd = new Product(
      body.name.trim(),
      body.price.trim(),
      body.imageUrl?.trim(),
      'Test description',
      []
    );
    newProd.save((error) => {
      if (error) {
        console.log(error);
        // handle error, send error page
      }
      res.redirect('/products');
    });
  } else {
    res.redirect('/add-product');
  }
};

module.exports.getAddProduct = (req, res) => {
  res.render('add-product', {
    pageTitle: 'Shop Mart - Add New Product',
    path: '/add-product',
  });
};
