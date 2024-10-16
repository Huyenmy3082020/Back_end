const express = require("express");
const mongoose = require("mongoose"); // Khai báo mongoose không cần destructuring
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const paypal = require("../../back-end/src/paypalConfig"); // Import paypal từ file paypal.js

const app = express();
const port = 2000;

// Middleware để phân tích cú pháp JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Middleware xử lý lỗi
app.use(errorHandler);

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:7000", // Địa chỉ front-end của bạn
    credentials: true, // Đảm bảo cho phép gửi cookie hoặc thông tin xác thực
  })
);

// Định nghĩa các route
routes(app);

// Route gốc
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Kết nối tới MongoDB
const MONGO_DB = "DDZleMPJY4GL7Vsp";
mongoose
  .connect(
    `mongodb+srv://Hahuyenmy:${MONGO_DB}@cluster0.lcgny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Success !!");
  })
  .catch((err) => {
    console.log(err);
  });

// Bắt đầu server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
