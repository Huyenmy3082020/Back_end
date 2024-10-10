const jwt = require("jsonwebtoken");

const generralAccesToken = async (payload) => {
  const accessToken = jwt.sign(
    payload, // Không cần đặt trong đối tượng { payload }
    "access_token",
    { expiresIn: "1h" } // Sửa từ "expriesIn" thành "expiresIn"
  );
  return accessToken;
};
const generralRefreshToken = async (payload) => {
  const accessToken = jwt.sign(
    payload, // Không cần đặt trong đối tượng { payload }
    "refresh_token",
    { expiresIn: "1h" } // Sửa từ "expriesIn" thành "expiresIn"
  );
  return accessToken;
};

module.exports = {
  generralAccesToken,
  generralRefreshToken,
};
