const express = require("express");
const router = express.Router();
const {
  checkLoginSchema,
  checkRegisterSchema,
} = require("../controllers/authController");

router.post("/login", checkLoginSchema);
router.post("/register", checkRegisterSchema);

module.exports = router;
