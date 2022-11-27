const Product = require("../models/product");
const CartItem = require("../models/cart-item");
const Cart = require("../models/cart");
const User = require("../models/user");

exports.cartDetails = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findById(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.json({ message: "successfully Added to Cart" });
    })
    .catch((err) => {
      res.json({ message: "Unable to Process" });
    });
};
