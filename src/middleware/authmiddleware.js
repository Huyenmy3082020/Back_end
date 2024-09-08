const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Middleware xác thực người dùng
const authMiddleware = (req, res, next) => {
  // Lấy token từ headers

  // Tách token từ chuỗi "Bearer <token>"
  const token = req.headers.split(" ")[1];
  console.log(token);
  console.log(process.env.ACCESS_TOKEN_SECRET);
  // Xác thực token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        mess: "Invalid authentication token",
        status: "ERROR",
      });
    }

    // Đưa thông tin user vào req để các middleware khác có thể sử dụng
    req.user = user;

    // Nếu bạn có kiểm tra quyền admin, hãy làm điều đó ở đây
    // const { payload } = user;
    // if (payload.isAdmin) {
    //   next();
    // } else {
    //   return res.status(403).json({
    //     mess: "Permission denied",
    //     status: "ERROR",
    //   });
    // }

    // Nếu không cần kiểm tra quyền, tiếp tục đến middleware tiếp theo
    next();
  });
};

module.exports = {
  authMiddleware,
};
