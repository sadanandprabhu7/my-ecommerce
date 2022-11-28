const Product = require("../models/product");
const CartItem = require("../models/cart-item");
const Cart = require("../models/cart");
const User = require("../models/user");
const OderItem = require("../models/order-item");
const Order = require("../models/order");
const { where } = require("sequelize");

exports.orderDetails = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((products) => {
      res.json({ data: products });
    })
    .catch((err) => console.log(err));
};
