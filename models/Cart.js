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
      this.totalPrice = 0;
      this.cart.forEach(item => {
        this.totalPrice += item.price * item.quantity
      })
      if (isNaN(this.totalPrice)) this.totalPrice = 0;
    })
  }

  add(productId, price, callback) {
    const productIndex = this.cart.findIndex(e => e.productId === productId);
    if (productIndex === -1) {
      this.cart.push({ productId: productId, quantity: 1, price: price });
    } else {
      this.cart[productIndex].quantity++;
    }
    this.totalPrice+= parseFloat(price);
    this.saveCartItems(callback);
  }

  remove(productId, callback) {
    const productIndex = this.cart.findIndex(e => e.productId === productId);
    if (productIndex === -1) return false;

    this.cart[productIndex].quantity-= 1;
    this.totalPrice -= this.cart[productIndex].price;
    if (this.cart[productIndex].quantity <= 0) {
      this.cart.splice(productIndex, 1);
    }
    this.saveCartItems(callback);
    return true;
  }

  saveCartItems(callback) {
    fs.writeFile(productDataFilePath, JSON.stringify(this.cart), (error) => {
      if (error)
        console.log(error)
      callback(error)
    });
  }
}

const shoppingCart = new Cart();
shoppingCart.initCart();

module.exports = shoppingCart