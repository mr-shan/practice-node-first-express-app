const Product = require('./../models/Product');
const shoppingCart = require('./../models/Cart');

module.exports.getCart = (req, res, next) => {
  Product.fetchAll((products) => {
    const cartProds = [];
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
    });
    res.render('cart', {
      products: cartProds,
      pageTitle: 'Shop Mart - Shopping Cart',
      path: '/cart',
    });
  });
};

module.exports.addToCart = (req, res, next) => {
  const id = req.body.productId
  const price = req.body.price
  if (!id || !price) {
    res.status(404).render('404', { pageTitle: '404! Not Found.', path: req.path });
  } else {
    shoppingCart.add(id, price);
    res.redirect('/cart');
  }
}