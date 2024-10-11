const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const id = req.headers.id;
  console.log(id);
  if (!authHeader) {
    return res.status(401).json({
      mess: "Token xác thực không được cung cấp",
      status: "ERROR",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      mess: "Token xác thực không hợp lệ",
      status: "ERROR",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        mess: "Token xác thực không hợp lệ",
        status: "ERROR",
      });
    }

    if (!user.payload?.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        mess: "Quyền truy cập bị từ chối",
        status: "ERROR",
      });
    }
  });
};
const authUserMiddleware = (req, res, next) => {
  const userID = req.params.id;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mess: "Token xác thực không được cung cấp",
      status: "ERROR",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      mess: "Token xác thực không hợp lệ",
      status: "ERROR",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        mess: "Token xác thực không hợp lệ",
        status: "ERROR",
      });
    }


    if (user?.payload.id === userID) {
      next();
    } else {
      return res.status(403).json({
        mess: "Quyền truy cập bị từ chối",
        status: "ERROR",
      });
    }
  });
};

module.exports = { authMiddleware, authUserMiddleware };
