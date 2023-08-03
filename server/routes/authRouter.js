const express = require("express");
const router = express.Router();
const {
  checkLoginSchema,
  checkRegisterSchema,
  loginWithDB,
  registerWithDB,
} = require("../controllers/authController");

router.post("/login", checkLoginSchema, loginWithDB);
router.post("/register", checkRegisterSchema, registerWithDB);

module.exports = router;
