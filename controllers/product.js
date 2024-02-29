const Product = require('./../models/Product');

module.exports.getProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
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

  Product.findByPk(id)
    .then((product) => {
      if (!product) return render404(req, res);

      res.render('product-details', {
        pageTitle: 'Shop Mart - ' + product.name,
        product: product,
        path: '/products',
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

// module.exports.postProduct = (req, res) => {
//   const body = req.body;
//   if (body.name.trim() !== '' && body.price.trim() !== '') {
//     Product.create({
//       name: body.name.trim(),
//       price: body.price.trim(),
//       image_url: body.image_url?.trim() || undefined,
//       description: body.description?.trim() || 'Test description',
//     })
//       .then((response) => {
//         console.log('New product added!');
//         res.redirect('/products');
//       })
//       .catch((error) => {
//         console.error(error);
//         res.redirect('/add-product');
//       });
//   } else {
//     res.redirect('/add-product');
//   }
// };

module.exports.postProduct = (req, res) => {
  const body = req.body;
  if (body.name.trim() !== '' && body.price.trim() !== '') {
    req.user
      .createProduct({
        name: body.name.trim(),
        price: body.price.trim(),
        image_url: body.image_url?.trim() || undefined,
        description: body.description?.trim() || 'Test description',
      })
      .then((response) => {
        console.log('New product added!');
        res.redirect('/products');
      })
      .catch((error) => {
        console.error(error);
        res.redirect('/add-product');
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

  Product.findByPk(id)
    .then((product) => {
      if (!product) return render404(req, res);

      res.render('admin/edit-product', {
        pageTitle: 'Shop Mart - ' + product.name,
        product: product,
        path: '/products',
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports.postEditProduct = (req, res, next) => {
  const id = req.params.productId;
  const data = {
    name: req.body.name.trim(),
    price: req.body.price.trim(),
    image_url: req.body.image_url?.trim(),
    description: req.body.description?.trim(),
  };

  Product.findByPk(id)
    .then((product) => {
      if (!product) return render404(req, res);

      product.name = data.name;
      product.price = data.price;
      product.image_url = data.image_url;
      product.description = data.description;

      return product.save();
    })
    .then((product) => {
      res.render('product-details', {
        pageTitle: 'Shop Mart - ' + product.name,
        product: product,
        path: '/products',
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;

  Product.findByPk(id)
    .then((product) => {
      if (!product) return render404(req, res);
      return product.destroy();
    })
    .then(() => {
      return res.redirect('/products');
    })
    .catch((error) => {
      console.error(error);
      return res.redirect(req.get('referer'));
    });
};

const render404 = (req, res) => {
  return res
    .status(404)
    .render('404', { pageTitle: '404! Not Found.', path: req.path });
};
