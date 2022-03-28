var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var productRouter = require("../controllers/productcontroller");
var {productDetails,productValidation} = require("../middleware/validation/product");
router.get('/save',productRouter.create);

router.get('/viewproducts', productDetails,productValidation,productRouter.findAll);

router.get('/deleteproduct',productDetails,productValidation,productRouter.deleteProduct);

router.get('/updateproduct',productDetails,productValidation,productRouter.updateProduct);

module.exports = router;