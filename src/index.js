const express = require("express");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const app = express();
const port = 2000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(errorHandler);
routes(app);

// Define a route for the root path
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
const MONGO_DB = "DDZleMPJY4GL7Vsp";
mongoose
  .connect(
    `mongodb+srv://Hahuyenmy:${MONGO_DB}@cluster0.lcgny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Susscess !!");
  })
  .catch((err) => {
    console.log(err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
