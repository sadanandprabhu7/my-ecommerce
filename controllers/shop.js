const Product = require("../models/product");

exports.shopProducts = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.json({ productDetails: data });
    })
    .catch((err) => {
      console.log(err);
    });
};
