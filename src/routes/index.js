const UserRouter = require("../routes/UserRouter");
const ProductRouter = require("../routes/ProductRouter");
const OrderRouter = require("../routes/OrderRouter");
const CategoryRouter = require("../routes/CategoryRouter");
const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/product", ProductRouter);
  app.use("/order", OrderRouter);
  app.use("/category", CategoryRouter);
};

module.exports = routes;
