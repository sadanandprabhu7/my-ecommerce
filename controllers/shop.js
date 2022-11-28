const Product = require("../models/product");

let ITEMS_PER_PAGE = 2;
exports.shopProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  Product.count()
    .then((total) => {
      totalItems = total;
      return Product.findAll({
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((products) => {
      res.json({
        products: products,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        nextPage: page + 1,
        hasPriviousPage: page > 1,
        previosPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => console.log(err));
};
