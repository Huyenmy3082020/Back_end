const UserRouter = require("../routes/UserRouter");
const ProductRouter = require("../routes/ProductRouter");
const OrderRouter = require("../routes/OrderRouter");
const CategoryRouter = require("../routes/CategoryRouter");
const CartRouter = require("../routes/CartRouter");
const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/product", ProductRouter);
  app.use("/order", OrderRouter);
  app.use("/category", CategoryRouter);
  app.use("/cart", CartRouter);
};

module.exports = routes;
