const User = require("../models/UserModel");
const UserService = require("../service/UserService");
const Jwtservice = require("../service/Jwtservice");
const bcrypt = require("bcrypt");
const {
  generralAccesToken,
  generralRefreshToken,
} = require("../service/Jwtservice");

require("dotenv").config();

const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const reg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,16}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.*[a-zA-Z\d]).{6,}$/;
    const isCheckpassword = passwordRegex.test(password);
    const isCheckEmail = reg.test(email);

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "err",
        message: "Không được bỏ trống trường nào",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "err",
        message: "Vui lòng điền đúng định dạng email",
      });
    } else if (password !== confirmPassword) {
      return res.status(400).json({
        status: "err",
        message: "Sai nhập lại mật khẩu",
      });
    } else if (!isCheckpassword) {
      return res.status(400).json({
        status: "err",
        message: "Mật khẩu phải có viết hoa và kí tự đặc biệt",
      });
    }

    const response = await UserService.createUser(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "err",
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Kiểm tra email và password
    if (!email || !password) {
      return res.status(400).json({
        status: "err",
        message: "Không được bỏ trống email hoặc password",
      });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({
        status: "err",
        message: "Không tìm thấy người dùng",
      });
    }

    // So sánh mật khẩu
    const comparePassword = await bcrypt.compare(password, checkUser.password);
    if (!comparePassword) {
      return res.status(401).json({
        status: "err",
        message: "Thông tin tài khoản hoặc mật khẩu không chính xác",
      });
    }

    const accessToken = generralAccesToken({
      id: checkUser.id,
      isAdmin: checkUser.isAdmin,
    });
    const refreshToken = generralRefreshToken({
      id: checkUser.id,
      isAdmin: checkUser.isAdmin,
    });
    console.log(refreshToken);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua HTTPS trong môi trường production
      sameSite: "Strict", // Ngăn chặn gửi cookie cùng các yêu cầu cross-site
      maxAge: 24 * 60 * 60 * 1000, // Thời gian sống của cookie (1 ngày)
    });

    return res.status(200).json({
      status: "ok",
      message: "Login successful",
      ACCESS_TOKEN_SECRET: accessToken,
      REFRESH_TOKEN_SECRET: refreshToken,
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({
      status: "err",
      message: "An internal server error occurred",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    if (!userId) {
      return res.status(400).json({
        status: "err",
        err: "the user id is not defind",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        status: "err",
        err: "the user id is not defind",
      });
    }

    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await UserService.getAll();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllUserbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await UserService.getAllUserbyId(id);
    if (response.data) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({
        status: "err",
        mess: "User not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "err",
      mess: error.message || "An error occurred",
    });
  }
};

const refreshUserToken = async (req, res) => {
  console.log(
    " req.cookies.REFRESH_TOKEN_SECRET",
    req.cookies.REFRESH_TOKEN_SECRET
  );
  try {
    const token = req.cookies.REFRESH_TOKEN_SECRET;

    if (!token) {
      return res.status(400).json({
        status: "err",
        message: "The token is required",
      });
    }

    const response = await Jwtservice.refreshTokenJwt(token);
    console.log(response);

    return res.status(200).json(response);
  } catch (error) {
    console.error(error); // Để ghi log lỗi
    return res.status(500).json({
      status: "err",
      message: error.message || "An error occurred",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("resfresh_token");

    return res.status(200).json(response);
  } catch (error) {
    console.error(error); // Để ghi log lỗi
    return res.status(500).json({
      status: "err",
      message: error.message || "An error occurred",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  refreshUserToken,
  getAll,
  getAllUserbyId,
  logoutUser,
};
