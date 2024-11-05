const User = require("../models/UserModel");
const Jwtservice = require("../../src/service/JwtService");
const bcrypt = require("bcrypt");
const {
  generralAccesToken,
  generralRefreshToken,
} = require("../../src/service/JwtService");

require("dotenv").config();

const createUser = async (newUser) => {
  const { name, email, password } = newUser;
  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return {
        status: "err",
        mess: "The email is already registered",
      };
    }

    const hash = bcrypt.hashSync(password, 10);

    const createdUser = await User.create({
      name,
      email,
      password: hash,
    });

    return {
      status: "ok",
      mess: "User created successfully",
      data: createdUser,
    };
  } catch (error) {
    throw error;
  }
};

const loginUser = async (userLogin) => {
  const { email, password } = userLogin;
  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return {
        status: "ERR",
        message: "Người dùng không tồn tại",
      };
    }

    // Kiểm tra mật khẩu
    const comparePassword = bcrypt.compareSync(password, checkUser.password);
    if (!comparePassword) {
      return {
        status: "ERR",
        message: "Mật khẩu hoặc người dùng không đúng",
      };
    }

    // Tạo access token và refresh token
    const accessToken = await generralAccesToken({
      id: checkUser.id,
      isAdmin: checkUser.isAdmin,
    });

    const refreshToken = await generralRefreshToken({
      id: checkUser.id,
      isAdmin: checkUser.isAdmin,
    });

    return {
      status: "OK",
      message: "Đăng nhập thành công",
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findById(id);

      if (!checkUser) {
        return {
          status: "err",
          mess: "User not found",
        };
      }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "ok",
        mess: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = async (id) => {
  try {
    const checkUser = await User.findById(id);

    if (!checkUser) {
      return {
        status: "err",
        mess: "User not found",
      };
    }

    // await User.findByIdAndDelete(id);

    return {
      status: "ok",
      mess: "User deleted successfully",
    };
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "ok",
        data: allUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUserbyId = async (id) => {
  try {
    const UserbyId = await User.findById(id); // Sử dụng findById thay vì find
    return { data: UserbyId }; // Trả về dữ liệu dưới dạng đối tượng
  } catch (error) {
    throw new Error(error.message); // Ném lỗi để hàm gọi bên ngoài xử lý
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
