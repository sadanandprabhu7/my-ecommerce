const Product = require("../models/product");
const CartItem = require("../models/cart-item");
const Cart = require("../models/cart");
const User = require("../models/user");

exports.cartAllItems = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.json({ products });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
