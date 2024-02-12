const { v4: uuidv4 } = require('uuid');

const path = require('path');
const fs = require('fs');

const { DEFAULT_PRODUCT_IMAGE_URL } = require('./../helpers/constant');
const basePath = require('./../helpers/path');

// helper functions
const productDataFilePath = path.join(basePath, 'data', 'products.json');
const readProductFileContents = (callback) => {
  fs.readFile(productDataFilePath, (error, fileContents) => {
    let products = []
    if (!error) {
      products = JSON.parse(fileContents)
    }
    callback(products);
  })
}

class Product {
  constructor(name, price, imgUrl = DEFAULT_PRODUCT_IMAGE_URL, description = '', categories = []) {
    this.id = uuidv4();
    this.name = name;
    this.price = price;
    this.imageUrl = imgUrl;
    this.description = description
    this.categories = categories
  }

  save(callback) {
    readProductFileContents(products => {
      products.push(this);
      fs.writeFile(productDataFilePath, JSON.stringify(products), callback);
    })
  }  

  static fetchAll(callback) {
    readProductFileContents(callback)
  }

  static get(id, callback) {
    readProductFileContents(products => {
      const reqProd = products.find(e => e.id === id);
      callback(reqProd);
    })
  }
}

module.exports = Product;