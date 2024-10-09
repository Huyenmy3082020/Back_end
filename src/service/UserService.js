const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generralAccesToken, generralRefreshToken } = require("./Jwtservice");

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
  const { email, password } = userLogin;
  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(400).json({
        status: "err",
        mess: "User not found",
      });
    }

    const comparePassword = await bcrypt.compare(password, checkUser.password);
    if (!comparePassword) {
      return res.status(401).json({
        status: "err",
        mess: "Incorrect email or password",
      });
    }

    const ACCESS_TOKEN_SECRET = generralAccesToken({
      id: checkUser.id,
      isAdmin: checkUser.isAdmin,
    });
    const REFRESH_TOKEN_SECRET = generralRefreshToken({
      id: checkUser.id,
      isAdmin: checkUser.isAdmin,
    });

    return res.status(200).json({
      status: "ok",
      mess: "Login successful",
      ACCESS_TOKEN_SECRET: ACCESS_TOKEN_SECRET,
      REFRESH_TOKEN_SECRET: REFRESH_TOKEN_SECRET,
    });
  } catch (error) {
    return res.status(500).json({
      status: "err",
      mess: "An error occurred",
      error: error.message,
    });
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
