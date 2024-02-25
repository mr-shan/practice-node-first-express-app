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
    const query = `
      INSERT INTO products
      (name, price, image_url, description)
      VALUES
      ('${this.name}', '${this.price}', '${this.image_url}', '${this.description}')
    `
    return db.execute(query);
  }

  static patch(productId, data, callback) {
    console.log(data);
    const query = `
      UPDATE products SET
      name='${data.name}',
      price='${data.price}',
      image_url='${data.image_url}',
      description='${data.description}'
      WHERE id=${productId}
    `;
    return db.execute(query);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static get(id, callback) {
    return db.execute('SELECT * FROM products WHERE id = ' + id);
  }

  static delete(id) {
    return db.execute(`DELETE FROM products where id=${id}`);
  }
}

module.exports = Product;
