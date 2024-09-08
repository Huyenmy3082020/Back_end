const User = require("../models/UserModel");
const UserService = require("../service/UserService");

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,16}$/;
    const isCheckEmail = reg.test(email);

    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(400).json({
        status: "err",
        err: "All fields are required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "err",
        err: "Invalid email format",
      });
    } else if (password !== confirmPassword) {
      return res.status(400).json({
        status: "err",
        err: "Passwords do not match",
      });
    }

    const response = await UserService.createUser(req.body);
    return res.status(201).json(response); // 201 Created
  } catch (error) {
    return res.status(500).json({
      status: "err",
      err: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body; // Chỉ lấy email và password
    const reg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,16}$/;
    const isCheckEmail = reg.test(email);

    // Kiểm tra các trường cần thiết
    if (!email || !password) {
      return res.status(400).json({
        status: "err",
        err: "Email and password are required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "err",
        err: "Invalid email format",
      });
    }

    // Gọi đến UserService để xử lý đăng nhập
    const response = await UserService.loginUser(req.body);

    // Trả về kết quả từ UserService
    return res.status(response.status === "ok" ? 200 : 400).json(response);
  } catch (error) {
    return res.status(400).json({
      status: "err",
      err: error.message,
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

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAll,
  getAllUserbyId,
};
