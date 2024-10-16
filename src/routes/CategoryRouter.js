const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/CategoryController");

router.post("/createCategory", CategoryController.createCategory);
router.get("/getCategory", CategoryController.getOrder);
router.get("/getCategoryByName/:name", CategoryController.getCategoryByname);

module.exports = router;