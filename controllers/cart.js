const Product = require('./../models/Product');
const shoppingCart = require('./../models/Cart');

module.exports.getCart = async (req, res, next) => {
  let cartProds = [];
  let summary = [];
  let totalPrice = 0;
  const cartItems = await shoppingCart.getCartData();
  if (cartItems.cartItems.length) {
    cartProds = cartItems.cartItems;
    summary = cartItems.summary;
    totalPrice = cartItems.totalPrice;
  }
  res.render('cart', {
    products: cartProds,
    summary: summary,
    totalPrice: Math.floor(cartItems.totalPrice * 100) / 100,
    pageTitle: 'Shop Mart - Shopping Cart',
    path: '/cart',
  });
};

module.exports.addToCart = async (req, res, next) => {
  const id = req.body.productId;
  const price = req.body.price;
  if (!id || !price) {
    res
      .status(404)
      .render('404', { pageTitle: '404! Not Found.', path: req.path });
  } else {
    const result = await shoppingCart.add(id, price);
    if (result) {
      res.redirect('/cart');
    } else {
      res.redirect(req.get('referer'));
    }
  }
};

module.exports.deleteCart = async (req, res, next) => {
  const id = req.body.productId;
  console.log(id)
  if (!id) return res.redirect('/cart');

  const result = await shoppingCart.remove(id);
  res.redirect('/cart');
};
