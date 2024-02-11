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
  constructor(name, price, imgUrl) {
    this.name = name;
    this.price = price;
    this.imageUrl = imgUrl || DEFAULT_PRODUCT_IMAGE_URL;
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
}

module.exports = Product;