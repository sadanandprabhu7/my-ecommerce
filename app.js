const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const sequelize = require("./util/database");

const shopProducts = require("./routes/main");

//const Sequelize = require("sequelize");
const Product = require("./models/product");
const CartItem = require("./models/cart-item");
const Cart = require("./models/cart");
const User = require("./models/user");

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(shopProducts);

//  RELATION DEFINED HERE
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  //.sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
    //console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "max", email: "test@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    //console.log(user)
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
