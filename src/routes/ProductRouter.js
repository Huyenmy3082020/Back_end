const express = require("express");
const router = express.Router();
const ProductController = require("../controller/ProductController");

router.post("/create", ProductController.createProduct);
router.get("/getAllProduct", ProductController.getProduct);
router.put("/restoreProduct", ProductController.restoreProductController);
router.get("/getAllProductTrash", ProductController.getProductTrash);
router.get("/getProductbyId/:id", ProductController.getProductbyId);
router.put("/updateProduct/:id", ProductController.updateProduct);
router.delete("/deleteProduct/:id", ProductController.deleteProduct);
router.delete("/destroyProduct/:id", ProductController.destroyProduct);
router.delete("/destroyProduct/:id", ProductController.destroyProduct);
router.delete("/deleteMany", ProductController.deleteMany);
router.get("/product/:type", ProductController.getProductType);
router.get("/getAllType", ProductController.getAllType);
router.get("/search", ProductController.search);

module.exports = router;
