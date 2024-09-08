const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generralAccesToken = (payload) => {
  console.log(payload);

  const access_token = jwt.sign(
    {
      payload,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  return access_token;
};

const generralRefreshToken = (payload) => {
  const refreshToken = jwt.sign(
    { payload },
    process.env.REFRESH_TOKEN_SECRET, // Đổi thành REFRESH_TOKEN_SECRET
    { expiresIn: "365d" }
  );

  return refreshToken;
};

module.exports = {
  generralAccesToken,
  generralRefreshToken,
};
