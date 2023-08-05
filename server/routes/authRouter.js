const express = require("express");
const router = express.Router();
const rateLimiter = require("../middleware/rateLimiter");
const {
  checkLoginSchema,
  checkRegisterSchema,
  loginWithDB,
  registerWithDB,
  getLoginStatus,
} = require("../controllers/authController");

router.get("/loginStatus", getLoginStatus);
router.post("/login", rateLimiter, checkLoginSchema, loginWithDB);
router.post("/register", checkRegisterSchema, registerWithDB);

module.exports = router;
