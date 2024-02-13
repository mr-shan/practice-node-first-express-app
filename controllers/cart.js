const Product = require('./../models/Product');
const shoppingCart = require('./../models/Cart');

module.exports.getCart = (req, res, next) => {
  Product.fetchAll((products) => {
    const cartProds = [];
    const summary = [];
    shoppingCart.cart.forEach((prod) => {
      const product = products.find((e) => e.id === prod.productId);
      if (!product) {
        cartProds.push({
          id: prod.id,
          name: 'This product is deleted',
          imageUrl: '',
        });
      } else {
        cartProds.push({ ...product, quantity: prod.quantity });
      }
      summary.push({
        name: product.name,
        quantity: prod.quantity,
        price: product.price * prod.quantity,
      });
    });
    res.render('cart', {
      products: cartProds,
      summary: summary,
      totalPrice: shoppingCart.totalPrice,
      pageTitle: 'Shop Mart - Shopping Cart',
      path: '/cart',
    });
  });
};

module.exports.addToCart = (req, res, next) => {
  const id = req.body.productId;
  const price = req.body.price;
  if (!id || !price) {
    res
      .status(404)
      .render('404', { pageTitle: '404! Not Found.', path: req.path });
  } else {
    shoppingCart.add(id, price, (error) => {
      if (error) {
        return res.redirect(req.get('referer'));
      } else res.redirect('/cart');
    });
  }
};

module.exports.deleteCart = (req, res, next) => {
  const id = req.body.productId;
  if (!id) return res.redirect('/cart');

  shoppingCart.remove(id, (error) => {
    res.redirect('/cart');
  });
};
