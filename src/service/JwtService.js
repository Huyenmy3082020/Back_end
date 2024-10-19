const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generralAccesToken = async (payload) => {
  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "30s",
  });
  return access_token;
};

const generralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  return refresh_token;
};

const refreshToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          return reject({
            status: "error",
            message: "Token is invalid or expired",
          });
        }
        const access_token = await generralAccesToken({
          id: user.id,
          isAdmin: user.isAdmin,
        });

        resolve({
          status: "success",
          message: "Token refreshed successfully",
          data: {
            access_token,
          },
        });
      });
    } catch (error) {
      reject({
        status: "error",
        message: "An unexpected error occurred",
        error: error.message,
      });
    }
  });
};
module.exports = {
  generralAccesToken,
  generralRefreshToken,
  refreshToken,
};
