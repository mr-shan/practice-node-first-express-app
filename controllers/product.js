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
      body.description?.trim() || 'Test description',
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
  res.render('admin/add-product', {
    pageTitle: 'Shop Mart - Add New Product',
    path: '/add-product',
  });
};

module.exports.getEditProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.get(id, (product) => {
    console.log(product)
    if (!product) {
      res
        .status(404)
        .render('404', { pageTitle: '404! Not Found.', path: req.path });
      return;
    } else {
      res.render('admin/edit-product', {
        pageTitle: 'Shop Mart - ' + product.name,
        product: product,
        path: '/products',
      });
    }
  });
};

module.exports.postEditProduct = (req, res, next) => {
  const id = req.params.productId;
  const data = {
    name: req.body.name.trim(),
    price: req.body.price.trim(),
    imageUrl: req.body.imageUrl?.trim(),
    description: req.body.description?.trim(),
  }
  Product.patch(id, data, (error, productDetails) => {
    if (error) {
      res.status(404).render('404', { pageTitle: '404! Not Found.', path: req.path });
    } else {
      res.render('product-details', {
        pageTitle: 'Shop Mart - ' + productDetails.name,
        product: productDetails,
        path: '/products',
      });
    }
  })
};

module.exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.delete(id, (error) => {
    if (error) {
      return res.redirect(req.get('referer'));
    } else {
      return res.redirect('/products')
    }
  })
}