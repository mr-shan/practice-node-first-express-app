const db = require('./../tools/database');

class Cart {
  constructor() {
  }

  async getCartData() {
    const query = `
      SELECT p.id, p.name, p.price, p.image_url, p.description, s.quantity, s.id AS cart_id, p.price * s.quantity AS total_price
      FROM products p
      INNER JOIN shopping_cart s ON p.id = s.product_id;
    `;
    const summary = [];
    let totalPrice = 0;
    try {
      const [data, fieldsData] = await db.execute(query);
      data.forEach((item) => {
        totalPrice += +item.total_price
        summary.push({
          name: data.name,
          quantity: item.quantity,
          price: +item.total_price,
        });
      });
      console.log(totalPrice)
      return { cartItems: data, totalPrice: totalPrice, summary: summary };
    } catch (error) {
      console.log('Shopping cart init error');
      console.error(error);
      return null;
    }
  }

  async getCartItems() {
    const query = 'SELECT * from shopping_cart';
    try {
      const [data, fieldsData] = await db.execute(query);
      return data;
    } catch (error) {
      return null
    }
  }

  async getCartItemByProductId(id) {
    if (!id) return null;
    const query = 'SELECT * FROM shopping_cart WHERE product_id=?'
    try {
      const [data, fieldsData] = await db.execute(query, [id]);
      return data[0];
    } catch (error) {
      return null
    }
  }

  async add(productId, price) {
    const cartData = await this.getCartItemByProductId(productId);
    if (cartData === null) return false;

    let query = '',
      params = [];
      console.log(cartData)
    if (cartData) {
      // update the quantity
      query = 'UPDATE shopping_cart SET quantity=? WHERE id=?';
      params = [cartData.quantity + 1, cartData.id];
    } else {
      // add a new one..
      query =
        'INSERT INTO shopping_cart (product_id, quantity, price) VALUES (?, ?, ?)';
      params = [productId, 1, price];
    }

    try {
      await db.execute(query, params);
      return true;
    } catch (error) {
      console.error('Error in adding item to cart');
      console.error(error);
      return false;
    }
  }

  async remove(productId) {
    const cartData = await this.getCartItemByProductId(productId);
    console.log(cartData, productId)
    if (cartData === null) return false;

    let query = '', params = []

    if (cartData.quantity === 1) {
      // only items in cart, remove it;
      query = 'DELETE FROM shopping_cart WHERE id=?';
      params = [cartData.id];
    } else {
      // item already in cart, increase it's quantity
      query = 'UPDATE shopping_cart SET quantity=? WHERE id=?';
      params = [cartData.quantity - 1, cartData.id];
    }

    try {
      await db.execute(query, params);
      return true;
    } catch (error) {
      console.error('Error in removing item from cart');
      console.error(error);
      return false;
    }
  }
}

const shoppingCart = new Cart();

module.exports = shoppingCart;
