const db = require('./../tools/database');

const { DEFAULT_PRODUCT_IMAGE_URL } = require('./../helpers/constant');

class Product {
  constructor(
    name,
    price,
    imgUrl = DEFAULT_PRODUCT_IMAGE_URL,
    description = '',
    categories = []
  ) {
    this.id = '';
    this.name = name;
    this.price = price;
    this.image_url = imgUrl;
    this.description = description;
    this.categories = categories;
  }

  save() {
    const query = 'INSERT INTO products (name, price, image_url, description) VALUES (?, ?, ?, ?)'
    return db.execute(query, [this.name, this.price, this.image_url, this.description]);
  }

  static patch(productId, data, callback) {
    const query = 'UPDATE products SET name=?, price=?, image_url=?, description=? WHERE id=?'
    return db.execute(query, [data.name, data.price, data.image_url, data.description, productId]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static get(id) {
    return db.execute('SELECT * FROM products WHERE id=?', [id]);
  }

  static delete(id) {
    return db.execute('DELETE FROM products where id=?', [id]);
  }
}

module.exports = Product;
