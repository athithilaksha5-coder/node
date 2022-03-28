const express = require('express');
const router = express.Router();

const admin = require("../controllers/admin");

router.post("/admininsert",admin.create)
router.post('/adminview',admin.view);
router.post('/userDetails',admin.userDetails);
router.post("/adminlogin",admin.adminLogin);
router.post("/userDetails",admin.userDetails);

module.exports = router;