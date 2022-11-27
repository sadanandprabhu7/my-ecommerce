const Sequelize = require("sequelize");

const sequelize = new Sequelize("ecommerce", "root", "sada123@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
