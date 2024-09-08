const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

// token dang bi loi
const { authMiddleware } = require("../middleware/authmiddleware");

router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.put("/update-user/:id", UserController.updateUser);
router.delete("/delete-user/:id", UserController.deleteUser);
router.get("/getALl", UserController.getAll);
router.get("/getUser/:id", authMiddleware, UserController.getAllUserbyId);

module.exports = router;
