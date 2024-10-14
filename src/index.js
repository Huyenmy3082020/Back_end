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
app.use(cookieParser());
app.use(errorHandler);
app.use(
  cors({
    origin: "http://localhost:7000", // Địa chỉ front-end của bạn
    credentials: true, // Đảm bảo cho phép gửi cookie hoặc thông tin xác thực
  })
);

routes(app);

// Define a route for the root path
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.options("/api/user/refreshtoken", cors()); // Xử lý preflight cho route này

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
