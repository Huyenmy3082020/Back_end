const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generralAccesToken = async (payload) => {
  const access_token = jwt.sign(
    payload, // payload không cần đặt trong đối tượng { payload }
    process.env.ACCESS_TOKEN, // Khóa bí mật cho access token
    { expiresIn: "3d" } // Đặt thời gian hết hạn của access token
  );
  return access_token;
};

const generralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    payload, // payload không cần đặt trong đối tượng { payload }
    process.env.REFRESH_TOKEN, // Khóa bí mật cho refresh token
    { expiresIn: "7d" } // Thời gian hết hạn của refresh token dài hơn (thường 7 ngày)
  );
  return refresh_token;
};

const refreshToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const refresh_token = req.cookies.refresh_token;
      console.log("refresh_token", refresh_token);
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          return reject({
            status: "error",
            message: "Token is invalid or expired",
          });
        }
        // Tạo access_token mới
        const access_token = await generralAccesToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });

        resolve({
          status: "success",
          message: "Token is valid",
          data: {
            user,
            access_token,
          },
        });
      });
    } catch (error) {
      reject({
        status: "error",
        message: "An unexpected error occurred",
      });
    }
  });
};

module.exports = {
  generralAccesToken,
  generralRefreshToken,
  refreshToken,
};
