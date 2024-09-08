const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generralAccesToken, generralRefreshToken } = require("./Jwtservier");

require("dotenv").config();

const createUser = async (newUser) => {
  const { name, email, password, phone } = newUser;
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
      phone,
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
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = userLogin;
    try {
      // Tìm người dùng bằng email
      const checkUser = await User.findOne({ email });

      // Kiểm tra xem người dùng có tồn tại không
      if (!checkUser) {
        resolve({
          status: "err",
          mess: "User not found",
        });
      }

      // So sánh mật khẩu
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "err",
          mess: "Incorrect email or password",
        });
      }

      // Tạo access token và refresh token
      const ACCESS_TOKEN_SECRET = generralAccesToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      const REFRESH_TOKEN_SECRET = generralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      // Trả về kết quả thành công
      resolve({
        status: "ok",
        mess: "Login successful",
        ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET,
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

    await User.findByIdAndDelete(id);

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
  return new Promise(async () => {
    try {
      const UserbyId = await User.find(id);
      res({
        data: UserbyId,
      });
    } catch (error) {}
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAll,
  getAllUserbyId,
};
