const express = require('express');
const jwt = require('jsonwebtoken');

const user = require("../models/user");

const router = express.Router();

const {createUser,userLogin,userDetails} = require("../controllers/user");
const { isAuth } = require('../middleware/auth');
const {validateUserSignUp,userValidation,validateUserSignIn} = require("../middleware/validation/user");

router.post('/create-user',validateUserSignUp,userValidation,createUser);
router.post('/userLogin',validateUserSignIn,userValidation,userLogin);
router.post('/userDetails',userDetails);

module.exports = router;