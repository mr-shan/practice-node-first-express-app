const Product = require('./../models/Product');

module.exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then(([products, fieldData]) => {
      res.render('products', {
        pageTitle: 'Shop Mart - Products Home',
        path: '/products',
        products: products,
      });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(404)
        .render('404', { pageTitle: '404! Not Found.', path: req.path });
    });
};

module.exports.getProductDetails = (req, res, next) => {
  const id = req.params.productId;
  Product.get(id)
    .then(([products, fieldData]) => {
      const product = products[0];
      console.log(product);
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
    })
    .catch((error) => console.error(error));
};

module.exports.postProduct = (req, res) => {
  const body = req.body;
  if (body.name.trim() !== '' && body.price.trim() !== '') {
    const newProd = new Product(
      body.name.trim(),
      body.price.trim(),
      body.image_url?.trim(),
      body.description?.trim() || 'Test description',
      []
    );
    newProd.save()
      .then(data => {
        console.log(data);
        res.redirect('/products');
      })
      .catch(error => {
        console.log(error);
        // handle error, send error page.
      })
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
  Product.get(id)
    .then(([products, fieldData]) => {
      const product = products[0];
      console.log(products);
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
    })
    .catch((error) => console.error(error));
};

module.exports.postEditProduct = (req, res, next) => {
  const id = req.params.productId;
  const data = {
    name: req.body.name.trim(),
    price: req.body.price.trim(),
    image_url: req.body.image_url?.trim(),
    description: req.body.description?.trim(),
  };
  Product.patch(id, data)
    .then(data => {
      console.log(data);
      return Product.get(id);
    })
    .then(([products, fieldData]) => {
      const product = products[0];
      res.render('product-details', {
        pageTitle: 'Shop Mart - ' + product.name,
        product: product,
        path: '/products',
      });
    })
    .catch(error => {
      console.error(error)
      res
      .status(404)
      .render('404', { pageTitle: '404! Not Found.', path: req.path });
    })
};

module.exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.delete(id)
    .then((data) => {
      console.log(data);
      return res.redirect('/products');
    })
    .catch((error) => {
      console.error(error);
      return res.redirect(req.get('referer'));
    });
};
