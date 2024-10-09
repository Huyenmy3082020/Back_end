const UserRouter = require("../routes/UserRouter");
const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/user", UserRouter);
};
module.exports = routes;
