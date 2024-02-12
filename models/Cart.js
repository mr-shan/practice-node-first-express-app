const path = require('path');
const fs = require('fs');

const basePath = require('./../helpers/path');

// helper functions
const productDataFilePath = path.join(basePath, 'data', 'cart.json');
const readCartFileContents = (callback) => {
  fs.readFile(productDataFilePath, (error, fileContents) => {
    let cartData = []
    if (!error) {
      cartData = JSON.parse(fileContents)
    }
    callback(cartData);
  })
}

class Cart {
  constructor() {
    this.cart = [];
    this.totalPrice = 0;
    this.initCart();
  }

  initCart() {
    readCartFileContents(cartContents => {
      this.cart = cartContents;
    })
  }

  add(productId, price) {
    const productIndex = this.cart.findIndex(e => e.productId === productId);
    if (productIndex === -1) {
      this.cart.push({ productId: productId, quantity: 1 });
    } else {
      this.cart[productIndex].quantity++;
    }
    this.totalPrice+= price;
    this.saveCartItems();
  }

  remove(productId) {
    const productIndex = this.cart.findIndex(e => e.productId === productId);
    if (productIndex === -1) return;

    this.cart[productIndex].quantity-- ;
    this.totalPrice -= this.cart[productIndex].totalPrice;
    if (this.cart[productIndex].quantity <= 0) {
      this.cart.splice(productIndex, 0);
    }
    this.saveCartItems();
  }

  saveCartItems() {
    fs.writeFile(productDataFilePath, JSON.stringify(this.cart), (error) => {
      console.log(error)
    });
  }
}

const shoppingCart = new Cart();
shoppingCart.initCart();

module.exports = shoppingCart