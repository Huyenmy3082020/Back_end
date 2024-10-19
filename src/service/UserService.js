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

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      // Kiểm tra xem người dùng có tồn tại không
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        return resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      // So sánh mật khẩu
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        return resolve({
          status: "ERR",
          message: "The password or user is incorrect",
        });
      }

      // Tạo access_token và refresh_token
      const accessToken = await generralAccesToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refreshToken = await generralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      reject(error);
    }
  });
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
