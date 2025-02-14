const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const auth = require("../middkeware/auth");
const { addProductValidator } = require("../middkeware/validations");
const formidableMiddleware = require("express-formidable");

router.post(
  "/",
  auth("createAny", "product"),
  addProductValidator,
  productsController.addProduct
);

router
  .route("/product/:id")
  .get(productsController.getProductById)
  .patch(auth("updateAny", "product"), productsController.updateProductById)
  .delete(auth("deleteAny", "product"), productsController.deleteProductById);

router.get("/all", productsController.allProducts);
router.post("/paginate/all", productsController.paginateProducts);

router.get("/:category", productsController.getWomanProducts);

router.post(
  "/add_product",
  auth("createAny", "product"),
  formidableMiddleware(),
  productsController.picUpload
);

module.exports = router;
